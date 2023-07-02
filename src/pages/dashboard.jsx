import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core';
import { getAuth, signOut } from "firebase/auth";
import { app, database, storage } from '../firebase/config'
import { useRouter } from 'next/router';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#022532',
    minHeight: '100vh',
    paddingTop: theme.spacing(4),
  },
  header: {
    color: 'white',
    marginBottom: theme.spacing(4),
  },
  companyCard: {
    backgroundColor: 'white',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const router = useRouter();
  const auth = getAuth();
  const handleUploadExcel = () => {
    // Implement your upload via Excel logic here
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  const companies = [
    {
      id: 'companyId1',
      name: 'Company 1',
      address: '123 Main St',
      employees: [
        {
          id: 'employeeId1',
          name: 'John Doe',
          position: 'Manager',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          department: 'Operations',
        },
        {
          id: 'employeeId2',
          name: 'Jane Smith',
          position: 'Developer',
          email: 'jane.smith@example.com',
          phone: '987-654-3210',
          department: 'Engineering',
        },
        // ...
      ],
    },
    {
      id: 'companyId2',
      name: 'Company 2',
      address: '456 Maple Ave',
      employees: [
        {
          id: 'employeeId3',
          name: 'Michael Johnson',
          position: 'HR Coordinator',
          email: 'michael.johnson@example.com',
          phone: '555-123-4567',
          department: 'Human Resources',
        },
        {
          id: 'employeeId4',
          name: 'Emily Davis',
          position: 'Sales Manager',
          email: 'emily.davis@example.com',
          phone: '444-987-6543',
          department: 'Sales',
        },
        // ...
      ],
    },
    // ...
  ];
 
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <div className="flex justify-between mb-16">
        <Typography variant="h4" className={classes.header}>
          Company Dashboard
        </Typography>
        <div className="flex gap-6 h-14">
          <Button variant="contained" color="primary" onClick={handleUploadExcel}>
            Upload via Excel
          </Button>
          <Button onClick={handleLogout} variant="contained" color="secondary" >
            Logout
          </Button>
        </div>
        </div>
        {companies.map((company) => (
          <Paper key={company.id} elevation={3} className={classes.companyCard}>
            <Typography variant="h6" gutterBottom>
              {company.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {company.address}
            </Typography>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Department</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {company.employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ))}
        
      </Container>
    </div>
  );
};

export default Dashboard;
