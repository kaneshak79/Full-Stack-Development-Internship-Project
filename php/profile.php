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

    /*
     * -------------------------
     * MySQL connection
     * -------------------------
     */

    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );


    /*
     * -------------------------
     * Get request data
     * -------------------------
     */

    $action = $_POST["action"] ?? "";
    $token = $_POST["token"] ?? "";


    if ($token === "") {

        echo json_encode([
            "success" => false,
            "message" => "Authentication token is missing."
        ]);

        exit;
    }


    /*
     * -------------------------
     * Redis connection
     * -------------------------
     */

    $redis = new Redis();

    // $redis->connect("127.0.0.1", 6379);

$redis = new Redis();

$redisHost = getenv("REDISHOST") ?: "127.0.0.1";
$redisPort = getenv("REDISPORT") ?: 6379;

$redis->connect($redisHost, $redisPort);

if (getenv("REDIS_PASSWORD")) {
    $redis->auth(getenv("REDIS_PASSWORD"));
}
    /*
     * -------------------------
     * Validate token
     * -------------------------
     */

    $userId = $redis->get("session:" . $token);

    if ($userId === false) {

        echo json_encode([
            "success" => false,
            "message" => "Session expired. Please login again."
        ]);

        exit;
    }

    $userId = (int)$userId;


    /*
     * -------------------------
     * Logout
     * -------------------------
     */

    if ($action === "logout") {

        $redis->del("session:" . $token);

        echo json_encode([
            "success" => true,
            "message" => "Logged out successfully."
        ]);

        exit;
    }


    /*
     * -------------------------
     * Get user from MySQL
     * -------------------------
     */

    $sql = "SELECT id, name, email
            FROM users
            WHERE id = :id
            LIMIT 1";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":id" => $userId
    ]);

    $user = $stmt->fetch();


    if (!$user) {

        echo json_encode([
            "success" => false,
            "message" => "User not found."
        ]);

        exit;
    }


    /*
     * -------------------------
     * MongoDB connection
     * -------------------------
     */

    $manager = new MongoDB\Driver\Manager(
        "mongodb://127.0.0.1:27017"
    );


    /*
     * -------------------------
     * Get profile
     * -------------------------
     */

    if ($action === "get") {

        $query = new MongoDB\Driver\Query([
            "userId" => $userId
        ]);

        $cursor = $manager->executeQuery(
            "guvi_project.profiles",
            $query
        );

        $profile = [];

        foreach ($cursor as $document) {

            $profile = [
                "age" => isset($document->age)
                    ? $document->age
                    : "",

                "dob" => isset($document->dob)
                    ? $document->dob
                    : "",

                "contact" => isset($document->contact)
                    ? $document->contact
                    : "",

                "gender" => isset($document->gender)
                    ? $document->gender
                    : "",

                "address" => isset($document->address)
                    ? $document->address
                    : ""
            ];

            break;
        }


        if (empty($profile)) {

            $profile = [
                "age" => "",
                "dob" => "",
                "contact" => "",
                "gender" => "",
                "address" => ""
            ];
        }


        echo json_encode([
            "success" => true,
            "user" => [
                "id" => $user["id"],
                "name" => $user["name"],
                "email" => $user["email"]
            ],
            "profile" => $profile
        ]);

        exit;
    }


    /*
     * -------------------------
     * Update profile
     * -------------------------
     */

    if ($action === "update") {

        $age = trim($_POST["age"] ?? "");
        $dob = trim($_POST["dob"] ?? "");
        $contact = trim($_POST["contact"] ?? "");
        $gender = trim($_POST["gender"] ?? "");
        $address = trim($_POST["address"] ?? "");


        /*
         * Validate age
         */

        if ($age !== "") {

            $ageNumber = filter_var(
                $age,
                FILTER_VALIDATE_INT
            );

            if (
                $ageNumber === false ||
                $ageNumber < 1 ||
                $ageNumber > 120
            ) {

                echo json_encode([
                    "success" => false,
                    "message" => "Please enter a valid age."
                ]);

                exit;
            }

            $age = $ageNumber;
        }


        /*
         * MongoDB update
         */

        $bulk = new MongoDB\Driver\BulkWrite();

        $bulk->update(
            [
                "userId" => $userId
            ],
            [
                '$set' => [
                    "userId" => $userId,
                    "age" => $age,
                    "dob" => $dob,
                    "contact" => $contact,
                    "gender" => $gender,
                    "address" => $address,
                    "updatedAt" => new MongoDB\BSON\UTCDateTime()
                ]
            ],
            [
                "upsert" => true
            ]
        );

        $manager->executeBulkWrite(
            "guvi_project.profiles",
            $bulk
        );


        echo json_encode([
            "success" => true,
            "message" => "Profile updated successfully."
        ]);

        exit;
    }


    /*
     * -------------------------
     * Invalid action
     * -------------------------
     */

    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
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

} catch (MongoDB\Driver\Exception\Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "Profile database error."
    ]);
}

?>