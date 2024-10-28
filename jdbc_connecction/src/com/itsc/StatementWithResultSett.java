package com.itsc;

import java.sql.*;

public class StatementWithResultSett {
    public static void main(String[] args) {
        String jdbcURL = "jdbc:mysql://localhost:3306/teachersdb";
        String username = "root";
        String pwd = "sosinasisaymelese";

        // Try-with-resources to ensure connection is closed automatically
        try (Connection connection = DriverManager.getConnection(jdbcURL, username, pwd);
             Statement statement = connection.createStatement()) {

            // Create table if it doesn't already exist
            String createTableSQL = "CREATE TABLE IF NOT EXISTS teacher1 (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "first_name VARCHAR(255), " +
                    "last_name VARCHAR(255), " +
                    "school VARCHAR(255), " +
                    "hire_date DATE, " +
                    "salary DECIMAL(10, 2))";
            statement.executeUpdate(createTableSQL);
            System.out.println("Table 'teacher1' created successfully.");

            // Define SQL insert statements for each row of data
            String[] insertStatements = {
                "INSERT INTO teacher1 (first_name, last_name, school, hire_date, salary) VALUES ('Aster', 'Nega', 'Yekatit 12', '2021-01-01', 8000)",
                "INSERT INTO teacher1 (first_name, last_name, school, hire_date, salary) VALUES ('Jemal', 'Edris', 'Bole', '2021-09-11', 20000)",
                "INSERT INTO teacher1 (first_name, last_name, school, hire_date, salary) VALUES ('Haile', 'Anaol', 'Saris', '2022-01-22', 15000)",
                "INSERT INTO teacher1 (first_name, last_name, school, hire_date, salary) VALUES ('Teddy', 'Anbesaw', 'Bole', '2021-01-01', 8000)"
            };

            // Execute insert statements
            for (String stmt : insertStatements) {
                statement.executeUpdate(stmt);
            }
            System.out.println("Data inserted successfully.");
        } catch (SQLException e) {
            e.printStackTrace(); // Handle any SQL exceptions
        }
    }
}
