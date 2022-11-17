const defaultColor = (type) => {
  console.log(type);
  switch(type) {
    case 'rec':
      return '#9370DB';
    case 'nrec':
      return '#3CB371';
    case 'GC':
      return '#CD0000'
  }  
}