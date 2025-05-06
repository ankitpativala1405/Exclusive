
 export const counter = (id) => {
    let countprojects = 0;
    let valueofprojects = Number(document.getElementById(id).innerHTML);
    let counterprojects = setInterval(() => {
      countprojects++;
      document.getElementById(id).innerHTML = countprojects;
      if (countprojects === valueofprojects) {
        clearInterval(counterprojects);
      }
    }, 1);
  };