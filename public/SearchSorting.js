import React from 'react';

// const achievements = [
//   { name: 'King', value: 111 },
//   { name: 'raj', value: 37 },
//   { name: 'Aana', value: 45 },
//   { name: 'Bob', value: -12 },
//   { name: 'Jim', value: 13 },
//   { name: 'Doll', value: 37 }
// ];

function sortNameAscending(achievements) {
  [].concat(achievements).sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

function sortNameDescending(achievements) {
  [].concat(achievements).sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  });
}

// const sortNameAscending = [].concat(achievements).sort((a, b) => {
//   let nameA = a.name.toUpperCase();
//   let nameB = b.name.toUpperCase();
//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }
//   return 0;
// });

// const sortNameDescending = [].concat(achievements).sort((a, b) => {
//   let nameA = a.name.toUpperCase();
//   let nameB = b.name.toUpperCase();
//   if (nameA > nameB) {
//     return -1;
//   }
//   if (nameA < nameB) {
//     return 1;
//   }
//   return 0;
// });

// const sortPercentAscending = [].concat(achievements).sort((a, b) => {
//   let numA = a.value;
//   let numB = b.value;
//   if (numA < numB) {
//     return -1;
//   }
//   if (numA > numB) {
//     return 1;
//   }
//   return 0;
// });

// const sortPercentDescending = [].concat(achievements).sort((a, b) => {
//   let numA = a.value;
//   let numB = b.value;
//   if (numA > numB) {
//     return -1;
//   }
//   if (numA < numB) {
//     return 1;
//   }
//   return 0;
// });

// function rangeNames() {
//   let nameStart = document.getElementById("name-start").value.toUpperCase();
//   let nameEnd = document.getElementById("name-end").value.toUpperCase();

//   if (nameStart < nameEnd) {
//     sortNameAscending.map(name => {
//       if (name.name >= nameStart && name.name <= nameEnd) {
//         console.log(name);
//       }
//     })
//   } else if (nameStart > nameEnd) {
//     sortNameDescending.map(name => {
//       if (name.name >= nameStart && name.name <= nameEnd) {
//         console.log(name);
//       }
//     })
//   } else if (nameStart === nameEnd) {

//     // ENTER CODE HERE

//     // ERROR CHECKING FOR NON-STRING

//   }
// }

// function rangePercentages() {
//   let percentStart = parseFloat(document.getElementById("percent-start").value);
//   let percentEnd = parseFloat(document.getElementById("percent-end").value);

//   if (percentStart < percentEnd) {
//     sortPercentAscending.map(percent => {
//       if (percent.value >= percentStart && percent.value <= percentEnd) {
//         console.log(percent);
//       }
//     })
//   } else if (percentStart > percentEnd) {
//     sortPercentDescending.map(percent => {
//       if (percent.value >= percentStart && percent.value <= percentEnd) {
//         console.log(percent);
//       }
//     })
//   } else if (percentStart === percentEnd) {

//     // ENTER CODE HERE
    
//     // ERROR CHECKING FOR NaN

//   }
// }