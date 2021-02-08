import React, {FC, useState} from "react";
import {Diary} from "../../Interfaces/Diary"
import http from "../../services/api";
import {updateDiary} from "../../features/diary/diarySlice";
import {setCanEdit, setActiveDiaryId, setCurrentlyEdit} from "../../features/entry/editiorSlice";
import {showAlert} from "../../util"
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../store";

interface Prop {
    diary: Diary
}
const buttonStyle: React.CSSProperties = {
    fontSize:"0.7em",
    margin: "0 0.5em"
};

const DiaryTile: FC<Prop> = (prop) => {
    const [diary, setDiary] = useState(prop.diary)
    const [isEditing, setisEditing] = useState(false)
    const dispatch = useAppDispatch();
    const totalEntries = prop.diary?.entryIds?.length;

    const saveChange = () => {
        http
        .put<Diary, Diary>(`/diary/${diary.id}`, diary)
        .then((diary) => {
            if(diary) {
                dispatch(updateDiary(diary));
                showAlert('Saved', 'success');
            }
        })
        .finally(() => {
            setisEditing(false)
        })
    }
    return(
        <div className="diary-title"> 
        <h2 onClick={() => setisEditing(true)} className="title" title="Click to edit" style={{cursor: "pointer"}}>
            {isEditing ? (
                <input value={diary.title} onChange={(e) => {
                    setDiary({
                        ...diary,
                        title: e.target.value
                    })
                }}
                onKeyUp={(e) => {
                    if(e.key === "Enter"){
                        saveChange();
                    }
                }}
                />
            ): (
                <span>{diary.title}</span>
            )}
            </h2>
            <p className="subtitle">{totalEntries ?? "0"} Saved Entries</p>
            <div style={{display:"flex"}}>
                <button style={buttonStyle}
                onClick={() => {
                    dispatch(setCanEdit(true))
                    dispatch(setActiveDiaryId(diary.id as string))
                    dispatch(setCurrentlyEdit(null))
                }}>
                Add New Entry

                </button>
                <Link to={`/diary/${diary.id}`} style={{width: "100%"}}>
                    <button className="secondary" style={buttonStyle}
                    > View all → </button>
                </Link>
            </div>
        </div>
    )
}
export default DiaryTile