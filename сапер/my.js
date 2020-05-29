
'use strict';
const openMenu = document.getElementById('checkbox1');
const table = document.getElementById('table');
const form = document.getElementById('form');
const field = document.querySelector('.field');
const bombNumber = document.querySelector('.bombNumber');
const closeForm = document.getElementById('closeForm');

let fieldH = form.height.value;
let fieldW = +form.width.value;
const fight = 5;

console.log(form.width.value);
console.log(+form.width.value);

let bombNumbers = fight;
bombNumber.textContent = bombNumbers;
let number = fieldH * fieldW;

// Масив всех даных
let arrA = {};

let fightNumbers = [];


let num = 1;



function time() {
   document.removeEventListener('click', time);
   let i = 0;
   setInterval(function () {
      i++;
      let time = document.querySelector('.time');
      time.textContent = i;
   }, 1000);
}

function create() {


  
   //создаем ячейки 
   for (let i = 0; i < fieldH; i++) {
      const createLine = document.createElement('ul');
      createLine.classList.add('line');
      //создаем линии
      for (let j = 0; j < fieldW; j++, num++) {

         const createElem = `
         <li class="w_${num} elem bg" id="${num}"></li>
      `;

         createLine.insertAdjacentHTML('beforeend', createElem);

         arrA[num] = {
            height: i,
            width: j,
            numberBomb: 0,
            desc: ''
         };

      }

      table.appendChild(createLine);
   }



   // отбор случайних пострелов 
   for (let i = 0; i < fight; i++) {

      function getRandomInt(min, max) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      let x = getRandomInt(0, number);

      fightNumbers.forEach(function (elem) {
         if (elem == x) {
            x = getRandomInt(1, number);
         }
      });

      fightNumbers.push(x);


      //  строим поле с цифрами в масиве чтоб потом передать елементам


      function check(h, w, n) {

         if (arrA[x][h] === 0) {
            arrA[x + fieldW][n] += 1; // 1 нижче 
            if (arrA[x][w] === 0) {
               //  console.log('верх лево ' + x);
               arrA[x + 1][n] += 1;
               arrA[x + fieldW + 1][n] += 1;

            } else if (arrA[x][w] == fieldW - 1) {
               //   console.log('верх право' + x);
               arrA[x - 1][n] += 1;
               arrA[x + fieldW - 1][n] += 1;
            } else {
               //    console.log(' верх середина' + x);
               arrA[x - 1][n] += 1;
               arrA[x + 1][n] += 1;
               arrA[x + fieldW + 1][n] += 1;
               arrA[x + fieldW - 1][n] += 1;
            }
         } else if (arrA[x][h] == fieldH - 1) {
            arrA[x - fieldW][n] += 1; // 1 вище 

            if (arrA[x][w] == 0) {
               //    console.log('низ лево'+ x);
               arrA[x - fieldW + 1][n] += 1;
               arrA[x + 1][n] += 1;

            } else if (arrA[x][w] == fieldW - 1) {
               //   console.log('низ право' + x);
               arrA[x - fieldW - 1][n] += 1;
               arrA[x - 1][n] += 1;

            } else {
               //  console.log('низ середина ' + x);
               arrA[x - fieldW + 1][n] += 1;
               arrA[x + 1][n] += 1;
               arrA[x - fieldW - 1][n] += 1;
               arrA[x - 1][n] += 1;
            }
         } else {
            arrA[x - fieldW][n] += 1;
            arrA[x + fieldW][n] += 1;
            if (arrA[x][w] == 0) {
               //  console.log(' середина левий' + x);
               arrA[x - fieldW + 1][n] += 1;
               arrA[x + fieldW + 1][n] += 1;
               arrA[x + 1][n] += 1;

            } else if (arrA[x][w] == fieldW - 1) {
               //  console.log(' середина правий' + x);
               arrA[x - fieldW - 1][n] += 1;
               arrA[x + fieldW - 1][n] += 1;
               arrA[x - 1][n] += 1;

            } else {
               //  центр
               arrA[x - fieldW + 1][n] += 1;
               arrA[x + fieldW + 1][n] += 1;
               arrA[x + 1][n] += 1;
               arrA[x - fieldW - 1][n] += 1;
               arrA[x + fieldW - 1][n] += 1;
               arrA[x - 1][n] += 1;
            }
         }
      }

      check('height', 'width', 'numberBomb');
   }

   // передаем значения цифр  клеткам 

   function fullNumber() {
      for (let key in arrA) {
         let arrANum = arrA[key];
         if (arrANum.numberBomb > 0) {
            const around = document.getElementById(`${key}`);
            around.textContent = arrANum.numberBomb;
         } else {
            const empty = document.getElementById(`${key}`);
            empty.classList.add('empty');
         }
      }
   }
   fullNumber();

   //красим в красний 

   function createField() {
      for (let i = 0; i < fightNumbers.length; i++) {
         let x = fightNumbers[i];
         let fightTarget = document.querySelector(`.w_${x}`);
         fightTarget.classList.add('bomb');
         fightTarget.textContent = '';

      };
   }
   createField();
}
create();

function openField() {
   for (let i = 1; i < number + 1; i++) {
      let elem = document.querySelector(`.w_${i}`);
      elem.classList.remove('bg');

      if (elem.classList.contains('flag')) {
         if (!elem.classList.contains('bomb')) {
            elem.classList.remove('flag');
            elem.classList.add('flag2');
         }
      }
   }
}

function show(event) {
   const target = event.target;
   target.classList.remove('bg');

   if (target.classList.contains('bomb')) {
      setTimeout(openField, 700);
      setTimeout(finish, 5000);

   }
   if (target.classList.contains('empty')) {
      for (let i = 1; i < number + 1; i++) {
         let elem = document.querySelector(`.w_${i}`);
         if (elem.classList.contains('empty') && !elem.classList.contains('bomb')) {
            elem.classList.remove('bg');
         }
      }
   }
}

function flag(event) {
   event.preventDefault();
   const target = event.target;
   if (target.classList.contains('flag')) {
      target.classList.remove('flag');
      bombNumbers++;
      bombNumber.textContent = bombNumbers;
   } else {
      target.classList.add('flag');
      bombNumbers--;
      bombNumber.textContent = bombNumbers;
   }
}

function openModal() {
   field.classList.toggle('hide');
   form.classList.toggle('hide');
}

function finish() {
   // table.classList.add('hide');
   const finish = document.querySelector('.finish');
   finish.innerHTML = `   
   Вы проиграли <br>   
   <button class="button">Сыграть еще раз </button>   
                     `;
   const button = document.querySelector('.button');
   button.onclick = () => {
      finish.innerHTML = '';
      openModal();
   }
}

function closeModal() {
   event.preventDefault();
   openModal();


}

document.addEventListener('click', time);
table.addEventListener('contextmenu', flag);
table.addEventListener('click', show);
closeForm.addEventListener('click', closeModal);
openMenu.addEventListener('click', openModal);