import React, { useState, useEffect } from 'react';
import { db } from '../../FireBase/FireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
//Icons
import { IonIcon } from '@ionic/react'; 
import { add, create,trashBin,eye,addSharp} from 'ionicons/icons';
//Modals
import ViewQuestionModal from '../../CustomComponents/AllQuestionModals/ViewQuestionModal';
import EditQuestionModal from '../../CustomComponents/AllQuestionModals/EditQuestionModal';
import AddQuestionModal from '../../CustomComponents/AllQuestionModals/AddNewQuestion';
const AllQuestions = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  //States for View Question Modal
  const [viewQuestion, setViewQuestion] = useState(null);
  const [viewAnswer, setViewAnswer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  //states for Edit Modal
  const [showEditModal,setShowEditModal] = useState(false)
  const [question,setquestion] = useState(null)
  const [answer,setanswer] = useState(null)
  const [index,setindex] = useState(null)
  const [totalQuestion,settotalquestion] = useState(null)
  const [catoegry,setcategory] = useState(null)
  const [title,settitle] = useState(null)
  const [catogryobject,setcatogryobject] = useState(null)
  

  //States for AddNew User
  const [NewQuestionCategory,setNewQuestionCategory] = useState(null)
  const [NewTypeCategory,setNewTypeCategory] = useState(null)
  const [totalQuestionLength,setTotalQuestionLength] = useState(null)
  const [showAddNewUserModal,setShowAddNewUserModal] = useState(false)

  useEffect(() => {
    
    fetchData();
  }, []);
  const fetchData = async () => {
    const questionBankRef = collection(db, 'QuestionBank');
    const questionBankSnapshot = await getDocs(questionBankRef);

    const questionsDataArray = [];
    questionBankSnapshot.forEach((doc) => {
      questionsDataArray.push({ id: doc.id, ...doc.data() });
    });

    setQuestionsData(questionsDataArray);
  };

  //Edit Question
  const handleEditQuestion = (question, answer, index, totalQuestions, categoryName, title,catogry) => 
  {
    setquestion(question)
    setanswer(answer)
    setindex(index)
    settotalquestion(totalQuestions)
    setcategory(categoryName)
    settitle(title)
    setcatogryobject(catogry)
    setShowEditModal(true);
  };
  const handleCloseEditModal = async () => {
    setShowEditModal(false);
    await fetchData(); // Fetch the data again
    setSelectedCategory(null); // Reset selectedCategory
    setSelectedType(null); // Reset selectedType
    
  };
  //View Question 
  const handleViewQuestion = (question,answer,index, totalQuestions) => {
   
    setViewQuestion(question);
    setViewAnswer(answer);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };

  //AddNewQuestionModal
  const handleAddNewQuestion = (catoegryName,QuestionType,totalQuestion)=>{
      setNewQuestionCategory(catoegryName)
      setNewTypeCategory(QuestionType)
      setTotalQuestionLength(totalQuestion)
      setShowAddNewUserModal(true)
  }
  const handleCloseAddUSerMOdal=async ()=>{
    setShowAddNewUserModal(false)
    await fetchData(); // Fetch the data again
    setSelectedCategory(null); // Reset selectedCategory
    setSelectedType(null); // Reset selectedType
  }
  const renderQuestionTable = (category, title) => (
    <div className="mb-4">
      <h5>{title}
      <button className="btn btn-primary" style={{marginLeft:10, alignItems:'center'}}  onClick={()=>{handleAddNewQuestion(selectedCategory.id,title,Object.keys(category).length / 2 )}}>
          Add New Question<IonIcon icon={addSharp} style={{ fontSize: '1.2rem' ,marginTop:3}} /> 
      </button> 
      </h5> 
      
      <div className="table-container" style={{ height: '300px', width: '200%', overflow: 'auto', borderRadius: '10px' }}>
        <table className="table table-sm table-dark">
          <thead>
            <tr className="table-dark">
              <th scope="col">#</th>
              <th scope="col">Question</th>
              <th scope="col">Answer</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category &&
              Array.from({ length: Object.keys(category).length / 2 }, (_, i) => i + 1).map((index) => (
                <tr key={index} className="table-light">
                  <td>{index}</td>
                  <td>{truncateString(category[`question${index}`])}</td>
                  <td>{truncateString(category[`answer${index}`])}</td>
                  <td>
                      <button className="btn btn-warning me-2" onClick={()=>handleEditQuestion(category[`question${index}`],category[`answer${index}`],index,Object.keys(category).length / 2 , selectedCategory.id,title,catoegry)} >
                        <IonIcon icon={create} style={{ fontSize: '1.2rem' }} /> 
                      </button>
                      <button className="btn btn-success" style={{marginLeft:5}} onClick={()=>{handleViewQuestion(category[`question${index}`],category[`answer${index}`],index,Object.keys(category).length / 2 )}}>
                        <IonIcon icon={eye} style={{ fontSize: '1.2rem' }} /> 
                      </button>               
                  </td>
                </tr> 
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const truncateString = (str, maxLength = 45) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedType(null); // Reset selectedType when a new category is selected
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="bg-white min-vh-100 d-flex flex-column p-4" style={{ overflow: 'auto' }}>
      <h2 className="mb-4">All System Based Questions</h2>

      <div className="dropdown mb-4">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="categoryDropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedCategory ? selectedCategory.id : 'Select Software Engineering Field'}
        </button>
        <div className="dropdown-menu" aria-labelledby="categoryDropdown">
          {questionsData.map((category) => (
            <button
              key={category.id}
              className="dropdown-item"
              onClick={() => handleCategoryChange(category)}
            >
              {category.id}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div key={selectedCategory.id} className="mb-4">
          <h4>{selectedCategory.id}</h4>

          {/* Dropdown for selecting question type */}
          <div className="dropdown mb-4">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="typeDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedType || 'Select Question Type'}
            </button>
            <div className="dropdown-menu" aria-labelledby="typeDropdown">
              <button
                className="dropdown-item"
                onClick={() => handleTypeChange('BrainTeaser')}
              >
                Brain Teaser
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleTypeChange('Technical')}
              >
                Technical
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleTypeChange('Situational')}
              >
                Situational
              </button>
            </div>
          </div>

          {/* Render table based on the selected question type */}
          {selectedType && (
            <div className="mb-4">
              <div className="col-md-6">
                {renderQuestionTable(
                  selectedCategory.systembasedquestions[selectedType + 'Questions'],
                  selectedType
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {showViewModal && (
        <ViewQuestionModal
          question={viewQuestion}
          answer={viewAnswer}
          handleClose={handleCloseViewModal}
        />
      )}   
      {showEditModal && (
  <EditQuestionModal
    question={question}
    answer={answer}
    category={catoegry}
    title={title}
    index={index}
    totalQuestions={totalQuestion}
    handleClose={() => handleCloseEditModal()}
  />
 )}
  {showAddNewUserModal && (
    <AddQuestionModal
      category={NewQuestionCategory}
      title={NewTypeCategory}
      totalQuestions={totalQuestionLength}
      handleClose={()=>handleCloseAddUSerMOdal()}
    />
    )}
</div>
  );
};

export default AllQuestions;
