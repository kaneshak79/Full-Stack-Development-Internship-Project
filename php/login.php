




<?php

header("Content-Type: application/json");

// $host = "127.0.0.1";
// $dbname = "guvi_project";
// $username = "root";
// $password = "Kanii@0709";

$host = getenv("DB_HOST") ?: "127.0.0.1";
$dbname = getenv("DB_NAME") ?: "guvi_project";
$username = getenv("DB_USER") ?: "root";
$password = getenv("DB_PASSWORD") ?: "Kanii@0709";

// $host = getenv("DB_HOST");
// $dbname = getenv("DB_NAME");
// $username = getenv("DB_USER");
// $password = getenv("DB_PASSWORD");

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );

    $email = trim($_POST["email"] ?? "");
    $userPassword = $_POST["password"] ?? "";

    if ($email === "" || $userPassword === "") {

        echo json_encode([
            "success" => false,
            "message" => "Email and password are required."
        ]);

        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

        echo json_encode([
            "success" => false,
            "message" => "Please enter a valid email."
        ]);

        exit;
    }

    $sql = "SELECT id, name, email, password
            FROM users
            WHERE email = :email
            LIMIT 1";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":email" => $email
    ]);

    $user = $stmt->fetch();

    // Email does not exist
    if (!$user) {

        echo json_encode([
            "success" => false,
            "errorType" => "email",
            "message" => "Email is incorrect."
        ]);

        exit;
    }

    // Email exists, but password is wrong
    if (!password_verify($userPassword, $user["password"])) {

        echo json_encode([
            "success" => false,
            "errorType" => "password",
            "message" => "Password is incorrect."
        ]);

        exit;
    }

    $sessionToken = bin2hex(random_bytes(32));

    $redis = new Redis();

    // $redis->connect("127.0.0.1", 6379);

    $redisHost = getenv("REDISHOST") ?: "127.0.0.1";
$redisPort = getenv("REDISPORT") ?: 6379;

$redis->connect($redisHost, $redisPort);

if (getenv("REDIS_PASSWORD")) {
    $redis->auth(getenv("REDIS_PASSWORD"));
}

    $redis->setex(
        "session:" . $sessionToken,
        3600,
        (string)$user["id"]
    );

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "token" => $sessionToken
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database connection failed."
    ]);

} catch (RedisException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Session service is unavailable."
    ]);
}

?>