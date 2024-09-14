import { jsPDF } from "jspdf";
import font from "./Onest-Regular-normal.js";

var callAddFont = function () {
this.addFileToVFS('Onest-Regular-normal.ttf', font);
this.addFont('Onest-Regular-normal.ttf', 'Onest-Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])

const makeStrokes = (str) => {
    let result = [];
    if(str.length > 64) {
      let i = 0;
      let y = 0;
      let newStr = '';
      Array.from(str).map((item) => {
        i += 1;
        y += 1;
        newStr += item;
        if(i == 63 || y === str.length || item == '\n') {
          i = 0;
          result.push(newStr);
          newStr = '';
        }
      });
      return result;
    } else {
      let i = 0;
      let newStr = '';
      Array.from(str).map((item) => {
        i += 1
        newStr += item;
        if(item == '\n' || i === str.length) {
          result.push(newStr);
          newStr = '';
        }
      });
      return result;
    }
  }
  
  function ageFormat(age) {
    var txt;
    let count = age % 100;
    if (count >= 5 && count <= 20) {
        txt = 'лет';
    } else {
        count = count % 10;
        if (count == 1) {
            txt = 'год';
        } else if (count >= 2 && count <= 4) {
            txt = 'года';
        } else {
            txt = 'лет';
        }
    }
    return txt;
  }

export default function createPdf (infoForPdf) {
    const doc = new jsPDF();
    let level = 10;
    doc.setFont("Onest-Regular");
    if(infoForPdf['Photo'] != '') {
      let someThing = URL.createObjectURL(infoForPdf['Photo'].files[0]);
      doc.addImage(someThing, "JPEG", 150, 10, 50, 70);
    }
    let fullName = `${infoForPdf['PersonalInfo'][0]} ${infoForPdf['PersonalInfo'][1]}`;
    if (infoForPdf['PersonalInfo'][2]) {
      fullName += " " + infoForPdf['PersonalInfo'][2];
    }
    doc.text(fullName, 10, level);
    if(infoForPdf['PersonalInfo'][3]) {
      doc.text("Возраст: " + infoForPdf['PersonalInfo'][3] + ageFormat(infoForPdf['PersonalInfo'][3]), 10, level+=10);
    }
    if(infoForPdf['Post']) {
      doc.text("Желаемая должность:", 10, level+=10);
      doc.text(infoForPdf['Post'], 10, level+=6);
    }
    if(infoForPdf['desiredSalary']) {
      doc.text("Желаемый оклад:", 10, level+=10);
      doc.text(infoForPdf['desiredSalary'] + document.querySelector('.wallet').value, 10, level+=6);
    }
    if(infoForPdf['Location']) {
      doc.text("Место жительства:", 10, level+=10);
      doc.text(infoForPdf['Location'], 10, level+=6);
      if (infoForPdf['Readiness']) {
        doc.text('Готов к удалённой работе', 10, level+=6);
      }
    }
    if(infoForPdf['Contacts']) {
      doc.text("Контакты:", 10, level+=10);
      doc.text(infoForPdf['Contacts'], 10, level+=6);
    }
    doc.line(0, level+=5, 300, level);
    if(infoForPdf['Skills']) {
      doc.text("Навыки:", 10, level+=10);
      doc.text(infoForPdf['Skills'], 10, level+=6);
    }
    if(infoForPdf['Experience'] != 0) {
      doc.text("Опыт работы:", 10, level+=10);
      for(let item of infoForPdf['Experience']) {
        doc.text(item[0] + ' ' + item[1], 10, level+=10);
        doc.text(item[2], 10, level+=7);
        let expInfo = makeStrokes(item[3]);
        for (let value of expInfo) {
          doc.text(value, 10, level+=6);
          if (level >= 290) {
            doc.addPage();
            level = 0;
          }
        }
      }
    }
    if(infoForPdf['Education'].length != 0) {
      doc.text("Образование:", 10, level+=10);
      for (let item of infoForPdf['Education']) {
        let edSpec = makeStrokes(item[1]);
        let edName = makeStrokes(item[2]);
        doc.text(item[0], 10, level+=6);
        for (let value of edSpec) {
          doc.text(value, 10, level+=6);
          if (level >= 290) {
            doc.addPage();
            level = 0;
          }
        }
        for (let value of edName) {
          doc.text(value, 10, level+=6);
          if (level >= 290) {
            doc.addPage();
            level = 0;
          }
        }
      }
    }
    doc.save();
  }