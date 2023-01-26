function trimZeros(n) {
  return String(n).replace(/^0+\.0*/, '');
}

function mergeRows(systemName) {
  // Verify if a row with property double-system="systemName" already exists
  let systemRow = document.querySelectorAll(`[double-system="${systemName}"]`);
  
  if ( systemRow.length > 0 ) { // row found
    // Loop through existing td elements in row and append values with a <br> tag 
    for ( let i = 0; i < systemRow[0].childElementCount / 2; i++ ) {
      if ( systemRow[0].childNodes[i].innerHTML === systemRow[0].childNodes[i + systemRow[0].childElementCount / 2].innerHTML) { continue; }
      systemRow[0].childNodes[i].innerHTML += '<br>' + systemRow[0].childNodes[i + systemRow[0].childElementCount / 2].innerHTML;
    }

    // Remove unecessary <tds> when repeated
    for ( let i = systemRow[0].childElementCount / 2; i < systemRow[0].childElementCount; ) {
      systemRow[0].removeChild(systemRow[0].childNodes[i]);
    }
  }
}

function addReferences(references, td, index) {
  const div = document.createElement('div');
  for ( let reference of references ) {
    let sup = document.createElement('sup');
    let a = document.createElement('a');

    sup.className = 'reference';
    sup.id = 'Ref_' + index;

    a.innerHTML = '[' + index + ']';
    a.setAttribute('target', 'papers');
    a.setAttribute('href', reference.link);

    reference['ref-number'] = index;
    index++;

    sup.appendChild(a);
    div.appendChild(sup);
    td.appendChild(div);

    return index;
  }
}

function addUncertainty(uncertainty, td) {
  if ( uncertainty.symmetrical ) { td.innerHTML += '(' + trimZeros(uncertainty.up) + ')'; } 
  else { td.innerHTML += '(+' + trimZeros(uncertainty.up) + '/-' + trimZeros(uncertainty.down) + ')'; }
}

function addComment(comment, tdName, span) {
  span.setAttribute('data-toggle', 'tooltip');
  span.setAttribute('data-placement', 'right');
  span.setAttribute('title', comment);

  tdName.appendChild(span);
}

function buildPulsarsTable() {
  const tableAnchor = document.getElementById('DNS-catalogue-tbody');

  let refIndex = 1;

  for ( let data of pulsarData ) {
    let tr = document.createElement('tr');

    // Double system
    if ( data.DoubleSystem ) {
      let systemRow = document.querySelectorAll(`[double-system="${data.systemName}"]`);
      if ( systemRow.length > 0 ) { // row found
        tr = systemRow[0];
      } else {
        tr.setAttribute('double-system', data.systemName);
      }
    }

    // Name
    let tdName = document.createElement('td');
    let divName = document.createElement('div');
    let span = document.createElement('span');

    span.innerHTML = data.name;
    divName.appendChild(span);
    tdName.appendChild(divName);
    
    // Add comments
    if ( data.comments ) { addComment(data.comments, tdName, span); }
    // References
    if ( data.hasReferences ) { 
      refIndex = addReferences(data.references, tdName, refIndex); 
    }
    tdName.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // P (period)
    let tdP = document.createElement('td');
    tdP.innerHTML = data.p.value;
    // P References
    if ( data.p.hasReferences ) {
      refIndex = addReferences(data.p.references, tdP, refIndex); 
    }

    // P dot
    let tdPDot = document.createElement('td');
    tdPDot.innerHTML = data.pdot.value;
    // P dot Uncertainty
    if ( data.pdot.hasUncertainty ) { addUncertainty(data.pdot.uncertainty, tdPDot) }
    // P dot References
    if ( data.pdot.hasReferences ) { 
      refIndex = addReferences(data.pdot.references, tdPDot, refIndex); }
    tdPDot.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Pb (orbital period)
    let tdPb = document.createElement('td');
    tdPb.innerHTML = data.pb.value;
    // Pb References
    if ( data.pb.hasReferences ) { 
      refIndex = addReferences(data.pb.references, tdPb, refIndex); }
    tdPb.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // e
    let tdE = document.createElement('td');
    tdE.innerHTML = data.e.value;
    // e References
    if ( data.e.hasReferences ) { 
      refIndex = addReferences(data.e.references, tdE, refIndex); }
    tdE.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // f
    let tdF = document.createElement('td');
    tdF.innerHTML = data.f.value;
    // f References
    if ( data.f.hasReferences ) { 
      refIndex = addReferences(data.f.references, tdF, refIndex); }
    tdF.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Mt
    let tdMt = document.createElement('td');
    if ( data.mt.value ) {
      tdMt.innerHTML = data.mt.value;
      // Mt Uncertainty
      if ( data.mt.hasUncertainty ) { addUncertainty(data.mt.uncertainty, tdMt) }
      // Mt References
      if ( data.mt.hasReferences ) { 
        refIndex = addReferences(data.mt.references, tdMt, refIndex); }
      tdMt.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
    } else {
      tdMt.innerHTML = '-';
    }

    // Mp
    let tdMp = document.createElement('td');
    // Is limit
    if ( data.mp.isLimit ) { tdMp.innerHTML = '< ' + data.mp.value; }
    else if ( data.mp.isAssumed ) { tdMp.innerHTML = '[' + data.mp.value + ']'; }
    else { tdMp.innerHTML = data.mp.value; }
    // Mp Uncertainty
    if ( data.mp.hasUncertainty ) { addUncertainty(data.mp.uncertainty, tdMp) }
    // Mp References
    if ( data.mp.hasReferences ) { 
      refIndex = addReferences(data.mp.references, tdMp, refIndex); }
    tdMp.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Mc
    let tdMc = document.createElement('td');
    // Is limit
    if ( data.mc.isLimit ) { tdMc.innerHTML = '> ' + data.mc.value; }
    else if ( data.mc.isAssumed ) { tdMc.innerHTML = '[' + data.mc.value + ']'; }
    else { tdMc.innerHTML = data.mc.value; }
    // Mc Uncertainty
    if ( data.mc.hasUncertainty ) { addUncertainty(data.mc.uncertainty, tdMc) }
    // Mc References
    if ( data.mc.hasReferences ) { 
      refIndex = addReferences(data.mc.references, tdMc, refIndex); }
    tdMc.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Chirp Mass
    let tdChirp = document.createElement('td');
    if (data.chirp.value) {
      tdChirp.innerHTML = data.chirp.value;
      // Chirp Mass References
     if ( data.chirp.hasReferences ) { 
      refIndex = addReferences(data.chirp.references, tdChirp, refIndex); }
    } else {
      tdChirp.innerHTML = '-';
    }

    // Delta
    let tdDelta = document.createElement('td');
    if ( data.delta.value ) {
      // Is limit
      if ( data.delta.isLimit ) { tdDelta.innerHTML = '< ' + data.delta.value; }
      else { tdDelta.innerHTML = data.delta.value; }
      // Delta Uncertainty
      if ( data.delta.hasUncertainty ) { addUncertainty(data.delta.uncertainty, tdDelta) }
      // Delta References
      if ( data.delta.hasReferences ) { 
        refIndex = addReferences(data.delta.references, tdDelta, refIndex); }
      tdDelta.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
    } else {
      tdDelta.innerHTML = '-';
    }

    // Chi
    let tdChi = document.createElement('td');
    if (data.chi.value) {
      tdChi.innerHTML = data.chi.value;
     if ( data.chi.hasReferences ) { 
      refIndex = addReferences(data.chi.references, tdChi, refIndex); }
    tdChi.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
    } else {
      tdChi.innerHTML = '-';
    }
    // Chi References

    // Effective chi
    let tdChieff = document.createElement('td');
    tdChieff.innerHTML = data.chieff.value ? data.chieff.value : '-';
    // Effective chi Uncertainty
    if ( data.chieff.hasUncertainty ) { addUncertainty(data.chieff.uncertainty, tdChieff) } 
    // Effective chi References
    if ( data.chieff.hasReferences ) { 
      refIndex = addReferences(data.chieff.references, tdChieff, refIndex); }
    tdChieff.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Characteristic age
    let tdAge = document.createElement('td');
    tdAge.innerHTML = data.age.value;
     // Characteristic age References
    if ( data.age.hasReferences ) { 
      refIndex = addReferences(data.age.references, tdAge, refIndex); }
    tdAge.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Tau
    let tdTau = document.createElement('td');
    tdTau.innerHTML = data.tau.value;
    // Tau References
    if ( data.tau.hasReferences ) { 
      refIndex = addReferences(data.tau.references, tdTau, refIndex); }
    tdTau.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
    
    // Append columns to row
    tr.appendChild(tdName);
    tr.appendChild(tdP);
    tr.appendChild(tdPDot);
    tr.appendChild(tdPb);
    tr.appendChild(tdE);
    tr.appendChild(tdF);
    tr.appendChild(tdMt);
    tr.appendChild(tdMp);
    tr.appendChild(tdMc);
    tr.appendChild(tdChirp);
    tr.appendChild(tdDelta);
    tr.appendChild(tdChi);
    tr.appendChild(tdChieff);
    tr.appendChild(tdAge);
    tr.appendChild(tdTau);

    // Append only values to row when "DoubleSystem" property is true
    if ( data.DoubleSystem ) { mergeRows(data.systemName); }

    // Append row to table
    tableAnchor.appendChild(tr);
  }
}

function buildSecondTable() {
  const tableAnchor = document.getElementById('DNS-kinematics-tbody');


  for ( let data of pulsarData ) {
      if (data.mu_l.value){ 
      let tr = document.createElement('tr');

      // Name
      let tdName = document.createElement('td');
      let divName = document.createElement('div');
      let span = document.createElement('span');
              
      span.innerHTML = data.name;
      divName.appendChild(span);
      tdName.appendChild(divName);

      // Distance
      let tdD = document.createElement('td');
      tdD.innerHTML = data.dist.value;
      // D Uncertainty
      if ( data.dist.hasUncertainty ) { addUncertainty(data.dist.uncertainty, tdD) }
      // D References
      if ( data.dist.hasReferences ) { addReferences(data.dist.references, tdD); }
      tdD.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

      // Galactic longitude
      let tdL = document.createElement('td');
      tdL.innerHTML = data.l.value;
      // Galactic longitude References
      if ( data.l.hasReferences ) { addReferences(data.l.references, tdL); }
      tdL.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
      
      // Galactic latitude
      let tdB = document.createElement('td');
      tdB.innerHTML = data.b.value;
      // Galactic latitude References
      if ( data.b.hasReferences ) { addReferences(data.b.references, tdB); }
      tdB.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

      // Galactic altitude
      let tdZ = document.createElement('td');
      if ( data.z.value){
      tdZ.innerHTML = data.z.value;
      // Galactic altitude References
      if ( data.z.hasReferences ) { addReferences(data.z.references, tdZ); }
      tdZ.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
      } else {
        tdZ.innerHTML = '-'
      }

      // Proper motion in l
      let tdMuL = document.createElement('td');
      tdMuL.innerHTML = data.mu_l.value;
      // Proper motion in l uncertainties
      if (data.mu_l.hasUncertainty) { addUncertainty(data.mu_l.uncertainty, tdMuL)}
      // Proper motion in l References
      if ( data.mu_l.hasReferences ) { addReferences(data.mu_l.references, tdMuL); }
      tdMuL.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

      // Proper motion in l
      let tdMuB = document.createElement('td');
      tdMuB.innerHTML = data.mu_b.value;
      // Proper motion in l uncertainties
      if (data.mu_b.hasUncertainty) { addUncertainty(data.mu_b.uncertainty, tdMuB)}
      // Proper motion in l References
      if ( data.mu_b.hasReferences ) { addReferences(data.mu_b.references, tdMuB); }
      tdMuB.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
              
      tr.appendChild(tdName);
      tr.appendChild(tdD);
      tr.appendChild(tdL);
      tr.appendChild(tdB);
      tr.appendChild(tdZ);
      tr.appendChild(tdMuL);
      tr.appendChild(tdMuB);

     // Append only values to row when "DoubleSystem" property is true
      

      tableAnchor.appendChild(tr);
        }
      }
}
