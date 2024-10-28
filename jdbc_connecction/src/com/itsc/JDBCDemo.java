package com.itsc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCDemo {
    public static void main(String[] args) {
        String driver = "com.mysql.cj.jdbc.Driver";
        String url = "jdbc:mysql://127.0.0.1:3306/StudentsDB";
        String username = "root"; 
        String password = "sosinasisaymelese"; 

        try {
            // Register the driver class (optional for newer versions)
            Class.forName(driver);

            // Establish the connection
            Connection conn = DriverManager.getConnection(url, username, password);
            System.out.println("Connection established successfully!");

            // Always close the connection in a finally block or use try-with-resources
            conn.close();
        } catch (ClassNotFoundException e) {
            System.err.println("MySQL JDBC Driver not found. Add the connector JAR to the classpath.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Failed to establish a connection. Check your database credentials and URL.");
            e.printStackTrace();
        }
    }
}
