export const addElementToDom = (id: string) => {
  // create a new div element
  const newDiv = document.createElement('div');

  newDiv.id = id;

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById('root');
  document.body.insertBefore(newDiv, currentDiv);

  return newDiv;
};
