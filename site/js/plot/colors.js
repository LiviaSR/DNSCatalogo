const defaultColor = (type) => {
  console.log(type);
  switch(type) {
    case 'rec':
      return '#58a6ff';
    case 'nrec':
      return '#34ebae';
    case 'GC':
      return '#eb3465'
  }  
}