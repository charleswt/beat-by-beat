module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    format_amount: (amount) => {
      // format large numbers with commas
      return parseInt(amount).toLocaleString();
    },
    //method to compare a and b 
    isEqual: (a, b) => {
      // Return true if a is equal to b
      return a === b;
    },
  };
  