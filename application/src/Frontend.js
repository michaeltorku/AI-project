import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsonData from './data/results.json';
let loanVal;
let occupationVal;
let paymentVal;
// function runPyScript(input) {
//   var jqXHR = $.ajax({
//     type: 'POST',
//     url: '/calculate',
//     async: false,
//     data: { mydata: input },
//   });

//   return jqXHR.responseText;
// }
const initialFormData = {
  Unnamed0: 0,
  Age: 23,
  Annual_Income: 0,
  Monthly_Inhand_Salary: 0,
  Num_Bank_Accounts: 0,
  Num_Credit_Cards: 0,
  Interest_Rate: 3,
  Num_of_Loan: 0,
  Delay_from_due_date: 0,
  Num_of_Delayed_Payment: 0,
  Changed_Credit_Limit: 0,
  Num_Credit_Inquiries: 0,
  Credit_Mix: 0,
  Outstanding_Debt: 0,
  Credit_Utilization_Ratio: 0,
  Credit_History_Age: 0,
  Total_EMI_per_month: 69.2,
  Amount_invested_monthly: 0,
  Monthly_Balance: 0,
  Credit_Builder_Loan: 0,
  Personal_Loan: 0,
  Debt_Consolidation_Loan: 0,
  Student_Loan: 0,
  Payday_Loan: 0,
  Mortgage_Loan: 0,
  Auto_Loan: 0,
  Home_Equity_Loan: 0,
  Month_August: 0,
  Month_February: 0,
  Month_January: 0,
  Month_July: 0,
  Month_June: 0,
  Month_March: 0,
  Month_May: 1,
  Occupation_Architect: 0,
  Occupation_Developer: 0,
  Occupation_Doctor: 0,
  Occupation_Engineer: 0,
  Occupation_Entrepreneur: 0,
  Occupation_Journalist: 0,
  Occupation_Lawyer: 0,
  Occupation_Manager: 0,
  Occupation_Mechanic: 0,
  Occupation_Media_Manager: 0,
  Occupation_Musician: 0,
  Occupation_Scientist: 0,
  Occupation_Teacher: 0,
  Occupation_Writer: 0,
  Payment_of_Min_Amount: 0,
  Payment_Behaviour_High_spent_Medium_value_payments: 0,
  Payment_Behaviour_High_spent_Small_value_payments: 0,
  Payment_Behaviour_Low_spent_Large_value_payments: 0,
  Payment_Behaviour_Low_spent_Medium_value_payments: 0,
  Payment_Behaviour_Low_spent_Small_value_payments: 0,
};

function Frontend(props) {
  const [submitted, setSubmit] = useState(false);
  const [item2, setItem2] = useState('');
  const [item3, setItem3] = useState('');
  const [item4, setItem4] = useState('');
  const [item5, setItem5] = useState('');
  const [item6, setItem6] = useState('');
  const [item7, setItem7] = useState('');
  const [result, setResult] = useState('');
  const [formData, setFormdata] = useState(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const json = JSON.stringify(formData);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'data.json');
    setSubmit(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    newValue = parseFloat(value);
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleLoanTypeChange = (event) => {
    const { name, value } = event.target;
    let newName = name;

    switch (value) {
      case 1:
        newName = 'Credit_Builder_Loan';
        break;
      case 2:
        newName = 'Personal_Loan';
        break;
      case 3:
        newName = 'Debt_Consolidation_Loan';
        break;
      case 4:
        newName = 'Student_Loan';
        break;
      case 5:
        newName = 'Payday_Loan';
        break;
      case 6:
        newName = 'Mortgage_Loan';
        break;
      case 7:
        newName = 'Auto_Loan';
        break;
      case 8:
        newName = 'Home_Equity_Loan';
        break;
    }
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [newName]: 1,
    }));
  };

  const handleOccupationChange = (event) => {
    const { name, value } = event.target;
    let newName = name;

    switch (value) {
      case 1:
        newName = 'Occupation_Architect';
        break;
      case 2:
        newName = 'Occupation_Developer';
        break;
      case 3:
        newName = 'Occupation_Doctor';
        break;
      case 4:
        newName = 'Occupation_Engineer';
        break;
      case 5:
        newName = 'Occupation_Entrepreneur';
        break;
      case 6:
        newName = 'Occupation_Journalist';
        break;
      case 7:
        newName = 'Occupation_Lawyer';
        break;
      case 8:
        newName = 'Occupation_Manager';
        break;
      case 9:
        newName = 'Occupation_Mechanic';
        break;
      case 10:
        newName = 'Occupation_Media_Manager';
        break;
      case 11:
        newName = 'Occupation_Musician';
        break;
      case 12:
        newName = 'Occupation_Scientist';
        break;
      case 13:
        newName = 'Occupation_Teacher';
        break;
      case 14:
        newName = 'Occupation_Writer';
        break;
    }
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [newName]: 1,
    }));
  };

  const handlePaymentBehaviorChange = (event) => {
    const { name, value } = event.target;
    let newName = name;

    switch (value) {
      case 1:
        newName = 'Payment_Behaviour_High_spent_Medium_value_payments';
        break;
      case 2:
        newName = 'Payment_Behaviour_High_spent_Small_value_payments';
        break;
      case 3:
        newName = 'Payment_Behaviour_Low_spent_Large_value_payments';
        break;
      case 4:
        newName = 'Payment_Behaviour_Low_spent_Medium_value_payments';
        break;
      case 5:
        newName = 'Payment_Behaviour_Low_spent_Small_value_payments';
        break;
    }
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [newName]: 1,
    }));
  };

  let text;

  // const [jsonData, setJsonData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('../data/results.json');
  //       setJsonData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const parsedData = JSON.parse(jsonData);

  const score = jsonData['credit_score'];
  const improvements = jsonData['improvements'];
  if (score == 2) {
    text = 'You have a good credit score. ' + improvements;
  } else if (score == 1) {
    text = 'You have an average credit score. ' + improvements;
  } else {
    text = 'You have a bad credit score. ' + improvements;
  }
  console.log(props);
  return submitted ? (
    <div
      style={{
        backgroundImage: `url(${props.background})`,
        height: '100vh',
        width: '100vw',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '-1px 2px 4px 0px',
          position: 'relative',
          height: 'auto',
          width: '400px',
          borderRadius: '25px',
          padding: '20px 20px 20px 20px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <form
          onSubmit={() => {
            setSubmit(true);
          }}
          style={{ display: 'grid', fontSize: '30px' }}
        >
          <div>
            <div>{text}</div>
            <input type='submit' value='Reuse Model' />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundImage: `url(${props.background})`,
        height: '100vh',
        width: '100vw',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '-1px 2px 4px 0px',
          position: 'relative',
          height: 'auto',
          width: '400px',
          borderRadius: '25px',
          padding: '20px 20px 20px 20px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: 'grid', fontSize: '30px' }}
        >
          <label style={{ fontSize: '15px' }}>
            Age:
            <input
              type='number'
              name='Age'
              value={formData.Age}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Annual Income:
            <input
              type='number'
              name='Annual_Income'
              value={formData.Annual_Income}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Monthly Inhand Salary:
            <input
              type='number'
              name='Monthly_Inhand_Salary'
              value={formData.Monthly_Inhand_Salary}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Number of Bank Accounts:
            <input
              type='number'
              name='Num_Bank_Accounts'
              value={formData.Num_Bank_Accounts}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Number of Credit Cards:
            <input
              type='number'
              name='Num_Credit_Cards'
              value={formData.Num_Credit_Cards}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>

          <label style={{ fontSize: '15px' }}>
            Interst Rate:
            <input
              type='number'
              name='Interest_Rate'
              value={formData.Interest_Rate}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Number of Loans:
            <input
              type='number'
              name='Num_of_Loan'
              value={formData.Num_of_Loan}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Total days delayed from due date:
            <input
              type='number'
              name='Delay_from_due_date'
              value={formData.Delay_from_due_date}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Number of delayed payments:
            <input
              type='number'
              name='Num_of_Delayed_Payment'
              value={formData.Num_of_Delayed_Payment}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Changed_Credit_Limit:
            <input
              type='number'
              name='Changed_Credit_Limit'
              value={formData.Changed_Credit_Limit}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Num_Credit_Inquiries:
            <input
              type='number'
              name='Num_Credit_Inquiries'
              value={formData.Num_Credit_Inquiries}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Credit_Mix:
            <input
              type='number'
              name='Credit_Mix'
              value={formData.Credit_Mix}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Outstanding_Debt:
            <input
              type='number'
              name='Outstanding_Debt'
              value={formData.Outstanding_Debt}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Credit_Utilization_Ratio:
            <input
              type='number'
              name='Credit_Utilization_Ratio'
              value={formData.Credit_Utilization_Ratio}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Credit_History_Age (months):
            <input
              type='number'
              name='Credit_History_Age'
              value={formData.Credit_History_Age}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Amount_invested_monthly:
            <input
              type='number'
              name='Amount_invested_monthly'
              value={formData.Amount_invested_monthly}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Monthly_Balance:
            <input
              type='number'
              name='Monthly_Balance'
              value={formData.Monthly_Balance}
              onChange={handleInputChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Loan Type:
            <input
              type='number'
              name='Credit_Builder_Loan'
              value={loanVal}
              onChange={handleLoanTypeChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Occupation:
            <input
              type='number'
              name='Occupation_Architect'
              value={occupationVal}
              onChange={handleOccupationChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <label style={{ fontSize: '15px' }}>
            Payment Behavior:
            <input
              type='number'
              name='Payment_Behaviour_High_spent_Medium_value_payments'
              value={paymentVal}
              onChange={handlePaymentBehaviorChange}
              style={{
                position: 'absolute',
                right: '15px',
              }}
            />
          </label>
          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Frontend;
