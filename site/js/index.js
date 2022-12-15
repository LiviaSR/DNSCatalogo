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

function addReferences(references, td) {
  const div = document.createElement('div');
  for ( let reference of references ) {
    let sup = document.createElement('sup');
    let a = document.createElement('a');

    sup.className = 'reference';
    sup.id = 'Ref_' + reference['ref-number'];

    a.innerHTML = '[' + reference['ref-number'] + ']';
    a.setAttribute('target', 'papers');
    a.setAttribute('href', reference.link);

    sup.appendChild(a);
    div.appendChild(sup);
    td.appendChild(div);
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
    if ( data.hasReferences ) { addReferences(data.references, tdName); }
    tdName.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // P (period)
    let tdP = document.createElement('td');
    tdP.innerHTML = data.p.value;
    // P References
    if ( data.p.hasReferences ) { addReferences(data.p.references, tdP); }

    // P dot
    let tdPDot = document.createElement('td');
    tdPDot.innerHTML = data.pdot.value;
    // P dot Uncertainty
    if ( data.pdot.hasUncertainty ) { addUncertainty(data.pdot.uncertainty, tdPDot) }
    // P dot References
    if ( data.pdot.hasReferences ) { addReferences(data.pdot.references, tdPDot); }
    tdPDot.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Pb (orbital period)
    let tdPb = document.createElement('td');
    tdPb.innerHTML = data.pb.value;
    // Pb References
    if ( data.pb.hasReferences ) { addReferences(data.pb.references, tdPb); }
    tdPb.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // e
    let tdE = document.createElement('td');
    tdE.innerHTML = data.e.value;
    // e References
    if ( data.e.hasReferences ) { addReferences(data.e.references, tdE); }
    tdE.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // f
    let tdF = document.createElement('td');
    tdF.innerHTML = data.f.value;
    // f References
    if ( data.f.hasReferences ) { addReferences(data.f.references, tdF); }
    tdF.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Mt
    let tdMt = document.createElement('td');
    if ( data.mt.value ) {
      tdMt.innerHTML = data.mt.value;
      // Mt Uncertainty
      if ( data.mt.hasUncertainty ) { addUncertainty(data.mt.uncertainty, tdMt) }
      // Mt References
      if ( data.mt.hasReferences ) { addReferences(data.mt.references, tdMt); }
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
    if ( data.mp.hasReferences ) { addReferences(data.mp.references, tdMp); }
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
    if ( data.mc.hasReferences ) { addReferences(data.mc.references, tdMc); }
    tdMc.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Chirp Mass
    let tdChirp = document.createElement('td');
    if (data.chirp.value) {
      tdChirp.innerHTML = data.chirp.value;
      // Chirp Mass References
     if ( data.chirp.hasReferences ) { addReferences(data.chirp.references, tdChirp); }
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
      if ( data.delta.hasReferences ) { addReferences(data.delta.references, tdDelta); }
      tdDelta.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping
    } else {
      tdDelta.innerHTML = '-';
    }

    // Chi
    let tdChi = document.createElement('td');
    if (data.chi.value) {
      tdChi.innerHTML = data.chi.value;
     if ( data.chi.hasReferences ) { addReferences(data.chi.references, tdChi); }
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
    if ( data.chieff.hasReferences ) { addReferences(data.chieff.references, tdChieff); }
    tdChieff.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Characteristic age
    let tdAge = document.createElement('td');
    tdAge.innerHTML = data.age.value;
     // Characteristic age References
    if ( data.age.hasReferences ) { addReferences(data.age.references, tdAge); }
    tdAge.setAttribute('style', 'white-space: nowrap') // Prevent references from wrapping

    // Tau
    let tdTau = document.createElement('td');
    tdTau.innerHTML = data.tau.value;
    // Tau References
    if ( data.tau.hasReferences ) { addReferences(data.tau.references, tdTau); }
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