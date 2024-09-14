import { useRef, useState } from "react";
import createPdf from "./js_pdf";


function App() {
  
  const infoForPdf = {
    'Photo': '',
    'PersonalInfo': [],
    'Contacts': [],
    'Location': '',
    'Skills': [],
    'Post': '',
    'desiredSalary': '',
    'Experience': [],
    'Education': [],
    'Readiness': false,
  };
  let [photo, setPhoto] = useState('');
  let [name, setName] = useState();
  let [surname, setSurname] = useState();
  let [patronymic, setPatronymic] = useState();
  let [age, setAge] = useState();
  let [contacts, setContacts] = useState();
  let [location, setLocation] = useState();
  let [readiness, setReadiness] = useState();
  let [post, setPost] = useState();
  let [desiredSalary, setDesiredSalary] = useState();
  let [skills, setSkills] = useState();
  let [period1, setPeriod1] = useState();
  let [position, setPosition] = useState();
  let [companyName, setCompanyName] = useState();
  let [responsibilities, setResponsibilities] = useState();
  let [period2, setPeriod2] = useState();
  let [speciality, setSpeciality] = useState();
  let [institution, setInstitution] = useState();
  let [experienceJsx, setExperienceJsx] = useState([]);
  let [educationJsx, setEducationJsx] = useState([]);
  let [exp, setExp] = useState([]);
  let [ed, setEd] = useState([]);
  let inputName = useRef(null);
  let inputSurname = useRef(null);
  const create = (e) => {
    e.preventDefault();
    if (name === undefined || surname === undefined) {
      inputName.current.style.border = "solid #ff0000";
      inputSurname.current.style.border = "solid #ff0000";
      return
    } else {
      inputName.current.style.border = "";
      inputSurname.current.style.border = "";
    }
    infoForPdf['Photo'] = photo;
    infoForPdf['PersonalInfo'] = [name, surname, patronymic, age];
    infoForPdf['Contacts'] = contacts;
    infoForPdf['Location'] = location;
    infoForPdf['Skills'] = skills;
    infoForPdf['Post'] = post;
    infoForPdf['desiredSalary'] = desiredSalary;
    infoForPdf['Experience'] = exp;
    infoForPdf['Education'] = [];
    infoForPdf['Readiness'] = readiness;
    createPdf(infoForPdf);
  }
  const addExperience = () => {
    let newResponsibilities = responsibilities.split('\n').join('\n');
    infoForPdf['Experience'] = [...infoForPdf['Experience'], ([period1, position, companyName, newResponsibilities])];
    const ExperienceJsx = infoForPdf['Experience'].map((item) => {
      setExp([...exp, [...item]]);
      return (
      <div className="expBlock">
          <div class="card">
            <div class="card-body">
              <div className="row">   
                <div className="col-6">
                  <p class="card-text">{item[0]}</p>
                </div>
                <div className="col-6">
                  <p class="card-text">{item[1]}</p>
                </div>
                <div className="col-12">
                  <b class="card-text">{item[2]}</b>
                </div>
                <div className="col-12">
                  <p class="card-text">{item[3]}</p>
                </div>
              </div>
            </div>
          </div>
      </div>);
    });
    setPeriod1('');
    setPosition('');
    setCompanyName('');
    setResponsibilities('');
    setExperienceJsx([...experienceJsx, ExperienceJsx]);
  }

  const addEducation = () => {
    infoForPdf['Education'].push([period2, speciality, institution]);
    const EducationJsx = infoForPdf['Education'].map((item) => {
      ed.push(item);
      return (<div>
        <p>{item[0]}</p>
        <p>{item[1]}</p>
        <p>{item[2]}</p>
      </div>);
    });
    setPeriod2('');
    setSpeciality('');
    setInstitution('');
    setEducationJsx([...educationJsx, EducationJsx]);
  }

  return (
  <div className="App col-6">
    <form className="resumeCreaterForm">
      <div className="mb-3">
        <label for="formFile" className="form-label">Фото</label>
        <input className="form-control" type="file" id="formFile" onChange={(e) => {setPhoto(e.target)}}/>
      </div>
      <div className="row personalInfo">
      <div className="col-4">
        <input ref={inputName} type="text" className="form-control inputName" placeholder="Имя*" aria-label="Имя" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="col-4">
        <input ref={inputSurname} type="text" className="form-control" placeholder="Фамилия*" aria-label="Фамилия" value={surname} onChange={(e) => setSurname(e.target.value)}/>
      </div>
      <div className="col-4">
        <input type="text" className="form-control" placeholder="Отчество" aria-label="Отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
      </div>
      <div className="col-4">
        <input type="text" className="form-control" placeholder="Возраст" aria-label="Возраст" value={age} onChange={(e) => setAge(e.target.value)}/>
      </div>
      </div>
      <div className="col contacts"><input type="text" className="form-control" placeholder="Контактная информация" aria-label="Контактная информация" value={contacts} onChange={(e) => setContacts(e.target.value)}/></div>
      <div className="form-floating location">
        <div className="col"><input type="text" className="form-control" placeholder="Место жительства" aria-label="Место жительства" value={location} onChange={(e) => setLocation(e.target.value)}/></div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => setReadiness(e.target.checked)}/>
          <label className="form-check-label" for="flexCheckDefault">
            Готов работать удалённо
          </label>
        </div>
      </div>
      <div className="col workerPosition"><input type="text" className="form-control" placeholder="Желаемая должность" aria-label="Желаемая должность" value={post} onChange={(e) => setPost(e.target.value)}/></div>
      <div className="col-6 desiredSalary"><input type="text" className="form-control" placeholder="Желаемый оклад" aria-label="Желаемый оклад" value={desiredSalary} onChange={(e) => setDesiredSalary(e.target.value)}/>
      <select name="select" className="wallet">
        <option value="₽">₽</option>
        <option value="$">$</option>
        <option value="€">€</option>
      </select>
      </div>
      <div className="col skills"><input type="text" className="form-control" placeholder="Ключевые навыки" aria-label="Ключевые навыки" value={skills} onChange={(e) => setSkills(e.target.value)}/></div>
      {experienceJsx}
      <button type="button" className="btn btn-primary col-12 experienceBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Добавить опыт
      </button>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Опыт работы</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4 mb10px"><input type="text" class="form-control" placeholder="Период" aria-label="Период" value={period1} onChange={(e) => setPeriod1(e.target.value)}/></div>
                <div className="col-4"><input type="text" class="form-control" placeholder="Должность" aria-label="Должность" value={position} onChange={(e) => setPosition(e.target.value)}/></div>
                <div className="col-4"><input type="text" class="form-control" placeholder="Название компании" aria-label="Название компании" value={companyName} onChange={(e) => setCompanyName(e.target.value)}/></div>
                <div className="col-12"><textarea type="text" class="form-control" placeholder="Обязанности выполнявшиеся на рабочем месте" aria-label="Обязанности выполнявшиеся на рабочем месте" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)}/></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button type="button" className="btn btn-primary" onClick={addExperience} data-bs-dismiss="modal">Сохранить изменения</button>
            </div>
          </div>
        </div>
      </div>
      {educationJsx}
      <button type="button" className="btn btn-primary col-12 educationBtn" data-bs-toggle="modal" data-bs-target="#educationModal">
        Добавить образование
      </button>
      <div className="modal fade" id="educationModal" tabindex="-1" aria-labelledby="educationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="educationModalLabel">Образование</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6 mb10px"><input type="text" class="form-control" placeholder="Период" aria-label="Период" value={period2} onChange={(e) => setPeriod2(e.target.value)}/></div>
                <div className="col-6"><input type="text" class="form-control" placeholder="Специальность" aria-label="Специальность" value={speciality} onChange={(e) => setSpeciality(e.target.value)}/></div>
                <div className="col-12"><input type="text" class="form-control" placeholder="Название учебного заведения" aria-label="Название учебного заведения" value={institution} onChange={(e) => setInstitution(e.target.value)}/></div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button type="button" className="btn btn-primary" onClick={addEducation} data-bs-dismiss="modal">Сохранить изменения</button>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={create}>Создать</button>
      <div>
        * - Поля обязательные к заполнению
      </div>
    </form>
  </div>
);
}

export default App;
