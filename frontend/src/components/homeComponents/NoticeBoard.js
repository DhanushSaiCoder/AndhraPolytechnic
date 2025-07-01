import React from 'react';
import '../../styles/HomeStyles/NoticeBoard.css';

const NoticeData = {
    news: [
        {
            id: 1,
            title: "New Semester Begins",
            description: "The new semester will start on 1st September. All students are requested to check their schedules.",
            date: "2023-08-20"
        },
        {
            id: 2,
            title: "Library Renovation",
            description: "The library will be closed for renovation from 5th to 15th September. We apologize for the inconvenience.",
            date: "2023-08-22"
        }
    ],
    events: [
        {
            id: 1,
            title: "Annual Sports Day",
            description: "Join us for the Annual Sports Day on 10th September. Registration is open now.",
            date: "2023-08-25"
        },
        {
            id: 2,
            title: "Guest Lecture on AI",
            description: "A guest lecture on Artificial Intelligence will be held on 15th September at 10 AM in the main auditorium.",
            date: "2023-08-28"
        }
    ],
    updates: [
        {
            id: 1,
            title: "New Course Offerings",
            description: "We are excited to announce new courses in Data Science and Machine Learning starting this semester.",
            date: "2023-08-30"
        },
        {
            id: 2,
            title: "Campus Wi-Fi Upgrade",
            description: "The campus Wi-Fi will be upgraded on 2nd September. Expect brief outages during the day.",
            date: "2023-08-31"
        }
    ],
}

const NoticeBoard = () => {
    return (
        <div className='NoticeBoard'>
            <div className='noticesContainer'>
                <div className='Notice'>
                    <h3>NEWS</h3>
                    <div className='noticeContent'>
                        {NoticeData.news.map((notice) => (
                            <div key={notice.id} className='noticeItem'>
                                <h4>{notice.title}</h4>
                                <p>{notice.description}</p>
                                <span>{new Date(notice.date).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='Notice'>
                    <h3>EVENTS</h3>
                    <div className='noticeContent'>
                        {NoticeData.events.map((event) => (
                            <div key={event.id} className='noticeItem'>
                                <h4>{event.title}</h4>
                                <p>{event.description}</p>
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='Notice'>
                    <h3>UPDATES</h3>
                    <div className='noticeContent'>
                        {NoticeData.updates.map((update) => (
                            <div key={update.id} className='noticeItem'>
                                <h4>{update.title}</h4>
                                <p>{update.description}</p>
                                <span>{new Date(update.date).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeBoard;
