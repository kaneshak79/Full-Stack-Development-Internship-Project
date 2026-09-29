<?php

header("Content-Type: application/json");

$host = "127.0.0.1";
$dbname = "guvi_project";
$username = "root";
$password = "Kanii@0709";

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

    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $userPassword = $_POST["password"] ?? "";

    if ($name === "" || $email === "" || $userPassword === "") {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit;
    }

    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     echo json_encode([
    //         "success" => false,
    //         "message" => "Please enter a valid email."
    //     ]);
    //     exit;
    // }


    if (
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    !preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/', $email)
) {
    echo json_encode([
        "success" => false,
        "message" => "Email is incorrect."
    ]);
    exit;
}

if (strlen($userPassword) < 4) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 5 characters."
    ]);
    exit;
}

    $hashedPassword = password_hash(
        $userPassword,
        PASSWORD_DEFAULT
    );

    // Prepared statement - required by the assignment
    $sql = "INSERT INTO users (name, email, password)
            VALUES (:name, :email, :password)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":password" => $hashedPassword
    ]);

    echo json_encode([
        "success" => true
    ]);

} catch (PDOException $e) {

    if ($e->getCode() == 23000) {

        echo json_encode([
            "success" => false,
            "message" => "Email already registered."
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Registration failed."
        ]);
    }
}
?>




