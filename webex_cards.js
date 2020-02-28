

/* Initialization part ends here */
Ciscospark  = require('ciscospark/env');
CiscoSpark = require('ciscospark')
const Airtable = require('airtable')
var moment = require('moment-timezone');



//send webex teams message
let sendMessage = function(attachments, email, recordId, question){
  
  process.env.CISCOSPARK_ACCESS_TOKEN = 'MmM2MjA2OTQtMTFhNC00ZDlhLWE2YmItOWZlZjc5OTNkMmIwZTJiZmUxMGMtM2U2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
    const spark1 = new CiscoSpark({
      credentials: process.env.CISCOSPARK_ACCESS_TOKEN
  });
  txt="Oops! Something went wrong 😕."
  spark1.messages.create({
    text: "",
    toPersonEmail: email,
    attachments: [{"contentType": "application/vnd.microsoft.card.adaptive","content": JSON.parse(attachments)}]
    }).then(function(response){
      updateStatus(recordId,"COMPLETE",question,response.id)
    })    
    .catch((error) => {
      console.error(error);
      updateStatus(recordId,"FAIL",question)
    });  
}




//UPDATE THE STATUS 
let updateStatus = function(recordId,status,question,messageId="ERROR"){
  
  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("PRE")

  if(question=="Q1"){
    table.update(recordId, {
      "Q1_STATUS" : status,
      "Q1_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(question=="Q2"){
    table.update(recordId, {
      "Q2_STATUS" : status,
      "Q2_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}
  else if(question=="Q3"){
    table.update(recordId, {
      "Q3_STATUS" : status,
      "Q3_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}  
  else if(question=="Q4"){
    table.update(recordId, {
      "Q4_STATUS" : status,
      "Q4_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q5"){
    table.update(recordId, {
      "Q5_STATUS" : status,
      "Q5_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}  
  else if(question=="Q6"){
    table.update(recordId, {
      "Q6_STATUS" : status,
      "Q6_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q7"){
    table.update(recordId, {
      "Q7_STATUS" : status,
      "Q7_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}   
  else if(question=="Q8"){
    table.update(recordId, {
      "Q8_STATUS" : status,
      "Q8_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}    
  else if(question=="Q9"){
    table.update(recordId, {
      "Q9_STATUS" : status,
      "Q9_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}     
   else if(question=="Q10"){
    table.update(recordId, {
      "Q10_STATUS" : status,
      "Q10_MESSAGE_ID": messageId
      }, (err, record) => {
          if (err) {
          console.error(err)
          return
          }
    })}             

}


// /* Handler function starts here */
// exports.handler = function(event, context, callback){

  Airtable.configure({
    apiKey: "keyoPw1vi0AN2TbIP"
  })
      
  const base = Airtable.base("appg6ovHFMJF0lH6O")
  const table = base("PRE")

    
  process.env.CISCOSPARK_ACCESS_TOKEN = 'MmM2MjA2OTQtMTFhNC00ZDlhLWE2YmItOWZlZjc5OTNkMmIwZTJiZmUxMGMtM2U2_PF84_1eb65fdf-9643-417f-9974-ad72cae0e10f';
    const spark1 = new CiscoSpark({
      credentials: process.env.CISCOSPARK_ACCESS_TOKEN
  });


  let records = []

  // called for every page of records
  const processPage = (partialRecords, fetchNextPage) => {
    records = [...records, ...partialRecords]
    fetchNextPage()
  }

  // called when all the records have been retrieved
  const processRecords = (err) => {
    if (err) {
      console.error(err)
      return
    }

    //process the `records` array
    records.forEach(function(record){

      var launchDate = moment.tz(record.get("Q1_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));
      var now = moment().tz(record.get("TIMEZONE"))

      //check if pending and then date
      if(record.get("Q1_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q1_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q1")
      
      launchDate = moment.tz(record.get("Q2_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q2_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q2_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q2") 
           
      launchDate = moment.tz(record.get("Q3_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));    
      if(record.get("Q3_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q3_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q3")       
             
      launchDate = moment.tz(record.get("Q4_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q4_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q4_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q4") 
          
      launchDate = moment.tz(record.get("Q5_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q5_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q5_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q5")    
          
      launchDate = moment.tz(record.get("Q6_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE"));     
      if(record.get("Q6_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q6_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q6") 
          
      launchDate = moment.tz(record.get("Q7_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q7_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q7_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q7")       
            
      launchDate = moment.tz(record.get("Q8_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q8_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q8_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q8") 
          
      launchDate = moment.tz(record.get("Q9_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q9_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q9_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q9")    
 
                    
      launchDate = moment.tz(record.get("Q10_DATE"),"MMMM Do YYYY, h:mm:ss a",record.get("TIMEZONE")); 
      if(record.get("Q10_STATUS")=="PENDING")
        if(launchDate<now)
          sendMessage(record.get("Q10_TEXT_JSON"), record.get("SE_EMAIL"), record.getId(), "Q10")  
    })
  }

  table.select({
    view: "Grid view",
    filterByFormula: 'OR({Q1_STATUS} = "PENDING",{Q2_STATUS} = "PENDING",{Q3_STATUS} = "PENDING",{Q4_STATUS} = "PENDING",{Q5_STATUS} = "PENDING",{Q6_STATUS} = "PENDING",{Q7_STATUS} = "PENDING",{Q8_STATUS} = "PENDING",{Q9_STATUS} = "PENDING",{Q10_STATUS} = "PENDING")'
  }).eachPage(processPage, processRecords)

//   callback(null,event)
// }



