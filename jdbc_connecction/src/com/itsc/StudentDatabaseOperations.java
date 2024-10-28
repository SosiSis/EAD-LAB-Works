package com.itsc;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class StudentDatabaseOperations {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/StudentsDB";
        String username = "root"; 
        String password = "sosinasisaymelese";   
        
        try {
            // Task 1: Connect to MySQL Database, Create Database, and Table
            Connection connection = DriverManager.getConnection(url, username, password);
            Statement statement = connection.createStatement();
            statement.execute("CREATE TABLE IF NOT EXISTS students (" +
                              "id INT PRIMARY KEY, " +
                              "firstname VARCHAR(255), " +
                              "lastname VARCHAR(255), " +
                              "grade INT)");
            
            // Task 2: Insert Data
            insertSampleData(connection);

            // Task 3: Retrieve Data
            retrieveData(connection);

            // Task 4: Update Data
            updateStudentName(connection, 1, "UpdatedFirstName");

            // Task 5: Delete Data
            deleteStudent(connection, 2);

            // Task 6: Calculate Average Grade
            calculateAverageGrade(connection);

            // Close the resources
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void insertSampleData(Connection connection) {
        try {
            // Insert a single row
            PreparedStatement insertSingle = connection.prepareStatement("INSERT INTO students (id, firstname, lastname, grade) VALUES (?, ?, ?, ?)");
            insertSingle.setInt(1, 1);
            insertSingle.setString(2, "John");
            insertSingle.setString(3, "Yonatan");
            insertSingle.setInt(4, 90);
            insertSingle.executeUpdate();

            // Insert ten more rows
            String[] firstNames = {"Sosina", "Liya", "Roman", "Tibu", "Rediet", "Kalkidan", "Eden", "Dani", "Bethel", "Dawit"};
            String[] lastNames = {"Sisay", "Daniel", "Kebede", "Elias", "Woduma", "Tekle", "Sisay", "Melese", "Habtamu", "Kassa"};
            int[] grades = {85, 78, 92, 88, 76, 95, 89, 83, 91, 87};

            for (int i = 0; i < 10; i++) {
                PreparedStatement insert = connection.prepareStatement("INSERT INTO students (id, firstname, lastname, grade) VALUES (?, ?, ?, ?)");
                insert.setInt(1, i + 2);  // ID starts from 2 since 1 is already used
                insert.setString(2, firstNames[i]);
                insert.setString(3, lastNames[i]);
                insert.setInt(4, grades[i]);
                insert.executeUpdate();
            }
            System.out.println("Sample data inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void retrieveData(Connection connection) {
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM students LIMIT 5");
            System.out.println("Retrieving data from students table:");
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String firstname = resultSet.getString("firstname");
                String lastname = resultSet.getString("lastname");
                int grade = resultSet.getInt("grade");
                System.out.println("ID: " + id + ", Name: " + firstname + " " + lastname + ", Grade: " + grade);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void updateStudentName(Connection connection, int id, String newFirstName) {
        try {
            PreparedStatement updateStatement = connection.prepareStatement("UPDATE students SET firstname = ? WHERE id = ?");
            updateStatement.setString(1, newFirstName);
            updateStatement.setInt(2, id);
            int rowsAffected = updateStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Updated student ID " + id + " to new first name: " + newFirstName);
            } else {
                System.out.println("No student found with ID " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void deleteStudent(Connection connection, int id) {
        try {
            PreparedStatement deleteStatement = connection.prepareStatement("DELETE FROM students WHERE id = ?");
            deleteStatement.setInt(1, id);
            int rowsAffected = deleteStatement.executeUpdate();
            if (rowsAffected > 0) {
                System.out.println("Deleted student with ID " + id);
            } else {
                System.out.println("No student found with ID " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void calculateAverageGrade(Connection connection) {
        try {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT AVG(grade) AS average_grade FROM students");
            if (resultSet.next()) {
                double averageGrade = resultSet.getDouble("average_grade");
                System.out.println("The average grade of all students is: " + averageGrade);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
