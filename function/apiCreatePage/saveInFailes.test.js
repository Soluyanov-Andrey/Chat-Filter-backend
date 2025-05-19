const { addListItems , addListItemsArray } = require('./saveInFailes'); 

describe('addListItemsArray', () => {
  const originalHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="themes/in1.html" target="leftframe">Установка аапач</a></li>
    
    <li><a href="in2.html" target="leftframe">Установка php</a></li>
    
    <li><a href="in3.html" target="leftframe">Страница 2</a></li>
    
    <li><a href="in4.html" target="leftframe">Страница 3</a></li>

 </ul>
</body>
</html>
`;

  it('should add new list items to the existing list', () => {
    const linkTexts = ['Страница 4', 'Страница 5','Страница 6','Страница 7'];
    const startNumber = 5;
    console.log(addListItemsArray(originalHtml, linkTexts, startNumber));

  });
})

describe('addListItems', () => {
  const originalHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Навигация</h1>
 <ul id = "list">

    <li><a href="themes/in1.html" target="leftframe">Установка аапач</a></li>
    
    <li><a href="in2.html" target="leftframe">Установка php</a></li>
    
    <li><a href="in3.html" target="leftframe">Страница 2</a></li>
    
    <li><a href="in4.html" target="leftframe">Страница 3</a></li>

 </ul>
</body>
</html>
`;

  it('should add new list items to the existing list', () => {
    const linkTexts = 'Страница 4';
    const startNumber = 5;
    console.log(addListItems(originalHtml, linkTexts, startNumber));

  });
})