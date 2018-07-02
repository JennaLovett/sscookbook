<?php

    $firstname = filter_input(INPUT_POST, 'firstname');
    $lastname = filter_input(INPUT_POST, 'lastname');
    $category = filter_input(INPUT_POST, 'category');
    $recipetitle = filter_input(INPUT_POST, 'recipetitle');
    $rdescription = filter_input(INPUT_POST, 'description');

    $servername = "localhost";
    $username = "username";
    $password = "password";
    $dbname = "cookbook";

    //create connection to db
    $connection = new mysqli($host, $username, $password, $dbname);

    //checking the connection
    if($connection->connect_error) {
        die("connection failed: " . $connection->connect_error);
    }
    
    //create database
    $sql = "CREATE TABLE recipes (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        recipetitle VARCHAR(30) NOT NULL,
        category VARCHAR(30) NOT NULL,
        rdescription VARCHAR(250) NOT NULL
    )";

    if($connection->query($sql) === TRUE) {
        echo "Table recipes created successfully";
    } else {
        echo "Error creating table: " . $connection->error;
    }
    $sql = "INSERT INTO recipe (firstname, lastname, category, recipetitle, rdescription) VALUES ('$firstname', '$lastname', '$category', '$recipetitle', '$rdescription')";

    if ($connection->query($sql)) {
        echo "New record is inserted sucessfully";
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }

    $connection->close();
?>