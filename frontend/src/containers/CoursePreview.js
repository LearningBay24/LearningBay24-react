import React from "react";
import { useSelector } from "react-redux";


const CoursePreview = () => {
    const courses = useSelector(state => state.allCourses.courses);
    if (courses != null)
    {
        const renderList = courses.map((course) => {
            const {title, image, price, category} = course;
            return(
                <div className="four wide column">
                    <div className="ui link cards">
                        <div className="card">
                            <div className="image">
                                <img src={image} alt={title} />
                            </div>
                            <div className="content">
                                <div className="header">{title}</div>
                                <div className="meta price">$ {price} </div>
                                <div className="meta">{category}</div>
                            </div>
                        </div>
                    </div>
                </div>
                );
                
        })


        return (
           <> 
           {renderList}
           </>
        );
        
    };
};

export default CoursePreview;
