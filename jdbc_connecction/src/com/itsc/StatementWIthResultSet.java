package com.itsc;

import java.sql.*;
public class StatementWIthResultSet {
	public static void main(String[] args) throws SQLException {
	String jdbcURL = "jdbc:mysql://localhost:3306/teachersdb";
	String username = "root";
	String pwd = "sosinasisaymelese";
	Connection connection = DriverManager.getConnection(jdbcURL,
	username, pwd);
	Statement statement = connection.createStatement();
	String createTableSQL = "CREATE TABLE teacher1 (" +
	"id int auto_increment primary key," +
	"first_name varchar(255)," +
	"last_name varchar(255)," +
	"school varchar(255)," +
	"hire_date date," +
	"salary decimal(10, 2))";
	statement.executeUpdate(createTableSQL);
	System.out.println("Table ‘teachers’ created successfully.");
	}
}
