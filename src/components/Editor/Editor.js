import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import InputControl from '../InputControl/InputControl';
import styles from './Editor.module.css';


function Editor(props) {
    const sections = props.sections;
    const information = props.information;

    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(sections)[0]
        );
    const [activeInformation, setActiveInformation] = useState(
        information[sections[Object.keys(sections)[0]]]
        );
    const [sectionTitle,setSectionTitle] = useState(
        sections[Object.keys(sections)[0]]
    );
    
    const [activeDetailIndex, setActiveDetailIndex] = useState(0);

    const [values, setValues] = useState({
        name: activeInformation.detail ? activeInformation.detail.name  : "",
        title: activeInformation.detail ? activeInformation.detail.title  : "",
        linkedin: activeInformation.detail ? activeInformation.detail.linkedin  : "",
        github: activeInformation.detail ? activeInformation.detail.github : "",
        phone: activeInformation.detail ? activeInformation.detail.phone  : "",
        email: activeInformation.detail ? activeInformation.detail.email  : "",
    });

    const handleSubmission = () => {
        switch (sections[activeSectionKey]) {
          case sections.basicInfo: {
            const tempDetail = {
              name: values.name,
              title: values.title,
              linkedin: values.linkedin,
              github: values.github,
              email: values.email,
              phone: values.phone,
            };
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.basicInfo]: {
                ...prev[sections.basicInfo],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.workExp: {
            const tempDetail = {
              certificationLink: values.certificationLink,
              title: values.title,
              startDate: values.startDate,
              endDate: values.endDate,
              companyName: values.companyName,
              location: values.location,
              points: values.points,
            };
            const tempDetails = [...information[sections.workExp].details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.workExp]: {
                ...prev[sections.workExp],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.project: {
            const tempDetail = {
              link: values.link,
              title: values.title,
              overview: values.overview,
              github: values.github,
              points: values.points,
            };
            const tempDetails = [...information[sections.project].details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.project]: {
                ...prev[sections.project],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.education: {
            const tempDetail = {
              title: values.title,
              college: values.college,
              startDate: values.startDate,
              endDate: values.endDate,
            };
            const tempDetails = [...information[sections.education].details];
            tempDetails[activeDetailIndex] = tempDetail;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.education]: {
                ...prev[sections.education],
                details: tempDetails,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.achievement: {
            const tempPoints = values.points;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.achievement]: {
                ...prev[sections.achievement],
                points: tempPoints,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.summary: {
            const tempDetail = values.summary;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.summary]: {
                ...prev[sections.summary],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          case sections.other: {
            const tempDetail = values.other;
    
            props.setInformation((prev) => ({
              ...prev,
              [sections.other]: {
                ...prev[sections.other],
                detail: tempDetail,
                sectionTitle,
              },
            }));
            break;
          }
          default :
          return null;
        }
      };

    const handlePoints = (value, index) => {
        const tempValues = {...values}
        if(!Array.isArray(tempValues.points)) tempValues.points = [];
        tempValues.points[index] = value
        setValues(tempValues)
    };

    useEffect(() => {
        const activeInfo = information[sections[activeSectionKey]]
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSectionKey]);
        setActiveDetailIndex(0);
        setValues({
            name: activeInfo.detail ? activeInfo.detail.name || "" : "",
            overview: activeInfo.details
              ? activeInfo.details.overview || ""
              : "",
            link: activeInfo.details ? activeInfo.details.link || "" : "",
            certificationLink: activeInfo.details
              ? activeInfo.details.certificationLink || ""
              : "",
            companyName: activeInfo.details
              ? activeInfo.details.companyName || ""
              : "",
            college: activeInfo.details
              ? activeInfo.details.college || ""
              : "",
            location: activeInfo.details
              ? activeInfo.details.location || ""
              : "",
            startDate: activeInfo.details
              ? activeInfo.details.startDate || ""
              : "",
            endDate: activeInfo.details ? activeInfo.details.endDate || "" : "",
            points: activeInfo.details
              ? activeInfo.details.points
                ? [...activeInfo.details.points]
                : ""
              : activeInfo.points
              ? [...activeInfo.points]
              : "", 
            title : activeInfo.detail ? activeInfo.detail.title || "" : activeInfo.details.title || "",
            linkedin: activeInfo.detail ? activeInfo.detail.linkedin || "" : "",
            github: activeInfo.detail ? activeInfo.detail.github || "" : "",
            phone: activeInfo.detail ? activeInfo.detail.phone || "" : "",
            email: activeInfo.detail ? activeInfo.detail.email || "" : "",
            summary: typeof activeInfo.detail !== "object" ? activeInfo.detail : "",
            other: typeof activeInfo.detail !== "object" ? activeInfo.detail : "",
          });
    },[activeSectionKey]);

    const workExpBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
               <InputControl
               label="Title"
               placeholder="Enter title eg. Software Developer" 
               value = {values.title}
               onChange={(event) =>
                setValues((prev) => ({...prev, title:event.target.value}))
            }
            />
               <InputControl
               label="Company Name"
               placeholder="Enter the company name eg. google" 
               value = {values.companyName}
               onChange={(event) =>
                setValues((prev) => ({...prev,companyName: event.target.value})
                )
            }
               /> 
            </div>
            <div className={styles.row}>
                <InputControl
                label="Certification Link"
                placeholder="Enter certificate link" 
                value = {values.certificationLink}
                onChange={(event) =>
                    setValues((prev) => ({...prev,certificationLink: event.target.value})
                    )
                }
                />
                <InputControl
                label="Location"
                placeholder="Enter Location eg. Mumbai" 
                value = {values.location}
                onChange={(event) =>
                    setValues((prev) => ({...prev,location: event.target.value})
                    )
                }
                />
            </div>
            <div className={styles.row}>
                <InputControl
                label="Start Date"
                type ="date"
                placeholder="Enter Start date of work" 
                value = {values.startDate}
                onChange={(event) =>
                    setValues((prev) => ({...prev,startDate: event.target.value})
                    )
                }
                />
                <InputControl
                label="End Date"
                type="date"
                placeholder="Enter end date of work" 
                value = {values.endDate}
                onChange={(event) =>
                    setValues((prev) => ({...prev,endDate: event.target.value})
                    )
                }
                />
            </div>
            <div className={styles.column}>
                <label>Enter work Description</label>
                <InputControl placeholder="Line 1"
                value = {values.points ? values.points[0] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,0)
                }
                />
                <InputControl placeholder="Line 2"
                value = {values.points ? values.points[1] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,1)
                } 
                />
                <InputControl placeholder="Line 3"
                value = {values.points ? values.points[2] : ""} 
                onChange={(event) =>
                    handlePoints(event.target.value,2)
                }
                />
                
            </div>
        </div>
    );

    const projectBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl label="Title" 
                placeholder="Enter title eg. Quiz App"
                value = {values.title}
                onChange={(event) =>
                    setValues((prev) => ({...prev,title: event.target.value})
                    )
                } 
                />
            </div>
            <InputControl 
            label="Overview"
            placeholder="Enter basic overview of project"
            value = {values.overview}
            onChange={(event) =>
                setValues((prev) => ({...prev,overview: event.target.value})
                )
            }  
            />
            <div className={styles.row}>
                <InputControl
                label="Deployed Link"
                placeholder="Enter depoloyed link of project" 
                value = {values.link} 
                onChange={(event) =>
                    setValues((prev) => ({...prev,link: event.target.value})
                    )
                }
                />
                <InputControl
                label="Github Link"
                placeholder="Enter github link of project" 
                value = {values.githubLink} 
                onChange={(event) =>
                    setValues((prev) => ({...prev,githubLink: event.target.value})
                    )
                }
                />
            </div>
            <div className={styles.column}>
                <label>Enter project Description</label>
                <InputControl placeholder="Line 1" 
                value = {values.points ? values.points[0] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,0)
                }
                />
                <InputControl placeholder="Line 2" 
                value = {values.points ? values.points[1] : ""}
                onChange={(event) => 
                    handlePoints(event.target.value,1)
                }
                />
                <InputControl placeholder="Line 3" 
                value = {values.points ? values.points[2] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,2)
                }
                />
                <InputControl placeholder="Line 4" 
                value = {values.points ? values.points[3] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,3)
                }
                />
            </div>
        </div>
    );

    const educationBody = (
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl 
                label="Title" 
                placeholder="Enter title eg. B.tech." 
                value = {values.title}
                onChange={(event) =>
                    setValues((prev) => ({...prev,title: event.target.value})
                    )
                }
                />
            </div>
            <InputControl
            label="College/School Name"
            placeholder="Enter name of your college/school" 
            value = {values.collegeName}
            onChange={(event) =>
                setValues((prev) => ({...prev,collegeName: event.target.value})
                )
            }
            />
            <div className={styles.row}>
                <InputControl 
                label="Start Date"
                type="date"
                placeholder="Enter the start date of this education" 
                value = {values.startDate}
                onChange={(event) =>
                    setValues((prev) => ({...prev,startDate: event.target.value})
                    )
                }
                />
                <InputControl
                label="End Date"
                type="date"
                placeholder="Enter the end date of this education" 
                value = {values.endDate}
                onChange={(event) =>
                    setValues((prev) => ({...prev,endDate: event.target.value})
                    )
                }
                />
            </div>
        </div>
    );

    const basicInfoDetail=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl
                label="Name"
                placeholder="Enter your full name eg. Prashant" 
                value = {values.name}
                onChange={(event) =>
                    setValues((prev) => ({...prev,name: event.target.value})
                    )
                }
                />
                <InputControl
                label="Title"
                placeholder="Enter your title eg. Software Developer" 
                value = {values.title}
                onChange={(event) =>
                    setValues((prev) => ({...prev,title: event.target.value})
                    )
                }
                />
            </div>
            <div className={styles.row}>
                <InputControl
                label="LinkedIn Link"
                placeholder="Enter your LinkedIn profile Link" 
                value = {values.linkedin}
                onChange={(event) =>
                    setValues((prev) => ({...prev,linkedin: event.target.value})
                    )
                }
                />
                <InputControl
                label="Github Link"
                placeholder="Enter your Github profile Link" 
                value = {values.github}
                onChange={(event) =>
                    setValues((prev) => ({...prev,github: event.target.value})
                    )
                }
                />
            </div>
            <div className={styles.row}>
                <InputControl
                label="Email" 
                placeholder="Enter your email" 
                value = {values.email}
                onChange={(event) =>
                    setValues((prev) => ({...prev,email: event.target.value})
                    )
                }
                />
                <InputControl
                label="Enter Phone"
                placeholder="Enter your phone number" 
                value = {values.phone}
                onChange={(event) =>
                    setValues((prev) => ({...prev,phone: event.target.value})
                    )
                }
                />
            </div>
        </div>
    );

    const achievementsBody = (
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>List your achievements</label>
                <InputControl placeholder="Line 1" 
                value = {values.points ? values.points[0] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,0)
                }
                />
                <InputControl placeholder="Line 2" 
                value = {values.points ? values.points[1] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,1)
                }
                />
                <InputControl placeholder="Line 3" 
                value = {values.points ? values.points[2] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,2)
                }
                />
                <InputControl placeholder="Line 4" 
                value = {values.points ? values.points[3] : ""}
                onChange={(event) =>
                    handlePoints(event.target.value,3)
                }
                />
            </div>
        </div>
    );

    const summaryBody = (
        <div className={styles.detail}>
            <InputControl
            label="Summary"
            placeholder="Enter your objective/Summary" 
            value = {values.summary}
            onChange={(event) =>
                setValues((prev) => ({...prev,summary: event.target.value})
                )
            }
            />
        </div>
    );

    const otherBody = (
        <div className={styles.detail}>
            <InputControl
            label="Other"
            placeholder = "Enter something" 
            value = {values.other}
            onChange={(event) =>
                setValues((prev) => ({...prev,other: event.target.value})
                )
            }
            />
        </div>
    );

    const generateBody = () => {
        switch(sections[activeSectionKey]){
            case sections.basicInfo:
                return basicInfoDetail;
            case sections.workExp:
                return workExpBody;
            case sections.project:
                return projectBody;
            case sections.education:
                return educationBody;
            case sections.achievements:
                return achievementsBody;
            case sections.summary:
                return summaryBody;
            case sections.others:
                return otherBody;
            default:
                return null;
        }
    };
        

    

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            {Object.keys(sections).map((key)=>(
                <div 
                className={`${styles.section} ${
                    activeSectionKey === key ? styles.active : ""
                    }`}
                    key={key}
                    onClick={() => setActiveSectionKey(key)}>
                    {sections[key]}
                </div>
            ))}
        </div>
        <div className={styles.body}>
            <InputControl label="Title" placeholder="Enter Section Title Here"
            value={sectionTitle}
            onChange={(event)=>setSectionTitle(event.target.value)}
            />
            <div className={styles.chips}>
                {activeInformation.details ? 
                        activeInformation.details.map((item,index)=>(
                            <div className={`${styles.chip} ${
                                activeDetailIndex === index ? styles.active : ""
                              }`}
                              key={item.title + index}
                              onClick={() => setActiveDetailIndex(index)}>
                                <p>{sections[activeSectionKey]} {index+1}</p>
                                <X />
                            </div>
                        )) 
                        : ""}
            </div>
    
            {generateBody()}
            <button onClick={handleSubmission}>Save</button>
        
        </div> 
    </div>
  );
}

export default Editor
