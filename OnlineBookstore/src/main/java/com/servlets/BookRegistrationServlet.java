package com.servlets;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.task.servlet.DBConnectionManager;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/register")

public class BookRegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

 

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Retrieve book details from the request
        String title = request.getParameter("title");
        String author = request.getParameter("author");
        String price = request.getParameter("price");

        // Prepare response writer to send feedback to the client
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        DBConnectionManager dbManager = context.getBean("dbConnectionManager", DBConnectionManager.class);


        try {
            // Open database connection
            dbManager.openConnection();
            Connection conn = dbManager.getConnection();

            // Prepare the SQL query to insert book details
            String query = "INSERT INTO books (title, author, price) VALUES (?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(query);

            // Set query parameters
            stmt.setString(1, title);
            stmt.setString(2, author);
            stmt.setString(3, price);

            // Execute the query
            int rowsAffected = stmt.executeUpdate();

            // Respond with a success message
            if (rowsAffected > 0) {
                out.println("<h2>Book registered successfully!</h2>");
            } else {
                out.println("<h2>Book registration failed!</h2>");
            }

            // Close the statement
            stmt.close();
        } catch (Exception e) {
            // Handle exceptions and respond with an error message
            e.printStackTrace();
            out.println("<h2>An error occurred while registering the book.</h2>");
        } finally {
            try {
                // Close the database connection
                dbManager.closeConnection();
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}

