// DOM Elem
const time = document.getElementById('time'),
    dayOfWeek = document.getElementById('day'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    button = document.getElementById('button');

// Arrays of days of the week and months
const Month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    Day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Data
let BgImgFullList = [[],[],[],[]];

//Create random list BgImgForDay
let createBgImgList = () => {
    for(let i = 0; i < BgImgFullList.length; i++) {
        let createBgImgInd = () => {
            if(BgImgFullList[i].length === 6 && i !== BgImgFullList.length - 1) {
                i++
            }
            let randInd = Math.ceil(Math.random() * 20);

            if(randInd > 0) {
                if(randInd < 10){
                    randInd = '0' + String(randInd);
                } else {
                    randInd = String(randInd);
                }
    
                if(BgImgFullList[i].includes(randInd)){
                    createBgImgInd();
                } else if(BgImgFullList[i].length < 6) {
                    BgImgFullList[i].push(randInd);
                    createBgImgInd();
                }
            } else {
                createBgImgInd();
            }
        }
        createBgImgInd();
    }
    return BgImgFullList = BgImgFullList.join(',').split(',');
}


// Show time
let showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.getDay(),
        date = today.getDate(),
        month = today.getMonth();

    // Output Time
    time.innerHTML = `${hour === 0 ? '0' + hour : hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    dayOfWeek.innerHTML = `${Day[day]}, ${date} ${Month[month]}`

    setTimeout(showTime, 1000)
}

// ADD Zeros
let addZero = (n) => {
    return (n < 10 ? '0' : '') + n;
}

//Set Background & Greeting
let setBgGreet = () => {
    let hour = new Date().getHours();

    if(hour >= 6 && hour < 12) {
        //Morning
        document.body.style.backgroundImage = `url('./assets/images/morning/${BgImgFullList[hour]}.jpg')`;
        greeting.textContent = 'Good Morning, '
    } else if(hour >= 12 && hour < 18) {
        //Day
        document.body.style.backgroundImage = `url('./assets/images/day/${BgImgFullList[hour]}.jpg')`;
        greeting.textContent = 'Good Day, '
    } else if(hour >= 18 && hour < 24) {
        //Evening
        document.body.style.backgroundImage = `url('./assets/images/evening/${BgImgFullList[hour]}.jpg')`;
        greeting.textContent = 'Good Evening, '
    }else if(hour >= 0 && hour < 6) {
        //Night
        document.body.style.backgroundImage = `url('./assets/images/night/${BgImgFullList[hour]}.jpg')`;
        greeting.textContent = 'Good Night, '
    }
}

// Get Name
let getName = () => {
    localStorage.getItem('name') === null || localStorage.getItem('name') === '' ? 
        name.textContent = '[Enter Name]': 
        name.textContent = localStorage.getItem('name');
}

//Set Name
let setName = (e) => {
    if(e.type === 'click') {
        name.textContent = '';
        return;
    }

    if(e.type === 'keypress') {
        //make sure enter is pressed
        if(e.key == 'Enter' || e.code == 'Enter') {
            if(name.textContent !== ''){
                localStorage.setItem('name', e.target.innerText);
            } else {name.textContent = localStorage.getItem('name') || '[Enter Name]'
            }
            name.blur();
        }
        return;
    }

    if(name.textContent !== ''){
        localStorage.setItem('name', e.target.innerText);
    } else {
        name.textContent = localStorage.getItem('name') || '[Enter Name]';
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('click', setName);
name.addEventListener('blur', setName);

// Get Focus
let getFocus = () => {
    localStorage.getItem('focus') === null || localStorage.getItem('focus') === ''?
        focus.textContent = '[Enter Focus]':
        focus.textContent = localStorage.getItem('focus');
}

//Set Focus
let setFocus = (e) => {
    if(e.type === 'click') {
        focus.textContent = '';
        return;
    }

    if(e.type === 'keypress') {
        //make sure enter is pressed
        if(e.key == 'Enter' || e.code == 'Enter') {
            if(focus.textContent !== ''){
                localStorage.setItem('focus', e.target.innerText);
            } else {focus.textContent = localStorage.getItem('focus') || '[Enter focus]'
            }
            focus.blur();
        }
        return;
    }

    if(focus.textContent !== ''){
        localStorage.setItem('focus', e.target.innerText);
    } else {
        focus.textContent = localStorage.getItem('focus') || '[Enter focus]';
    }
}
focus.addEventListener('click', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//Change background-img
let hour = new Date().getHours(),
    countBgImg = hour,
    timesOfDay = '';

let changeBgImg = () => {
    if(countBgImg < 23) {
        countBgImg += 1;
    } else if (countBgImg === 23) {
        countBgImg = 0
    } else if (countBgImg >= 0 && countBgImg < hour) {
        countBgImg += 1;
    }

    if(countBgImg >= 6 && countBgImg < 12) {
        //Morning
        timesOfDay = 'morning';
    } else if(countBgImg >= 12 && countBgImg < 18) {
        //Day
        timesOfDay = 'day';
    } else if(countBgImg >= 18 && countBgImg < 24) {
        //Evening
        timesOfDay = 'evening';
    }else if(countBgImg >= 0 && countBgImg < 6) {
        //Night
        timesOfDay = 'night';
    }
    
    document.body.style.backgroundImage = `url('./assets/images/${timesOfDay}/${BgImgFullList[countBgImg]}.jpg')`;
    
}

button.addEventListener('click', changeBgImg)

//Run
createBgImgList();
showTime();
setBgGreet();
getName();
getFocus();

//Change quote
const quote = document.getElementById('quote'),
    author = document.getElementById('author'),
    btn = document.getElementById('btn'),
    url = `https://type.fit/api/quotes`;

async function getQuote() {
    const response = await fetch(url),
        data = await response.json(); 
        quote.textContent = data[Math.floor(Math.random() * data.length)].text;
        author.textContent = data[Math.floor(Math.random() * data.length)].author;
}

getQuote();

btn.addEventListener('click', getQuote);

