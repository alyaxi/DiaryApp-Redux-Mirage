import React, {useState, useEffect, FC } from "react";
import {useSelector} from "react-redux";
import { RootState } from "../../RootReducer";
import Markdown from "markdown-to-jsx";
import http from "../../services/api";
import {Entry} from "../../Interfaces/Entry";
import {Diary} from "../../Interfaces/Diary";
import {setCurrentlyEdit, setCanEdit } from "../../features/entry/editiorSlice";
import {updateDiary } from "../../features/diary/diarySlice"
import {updateEntry } from "../../features/entry/entrySlice";
import {showAlert} from "../../util"
import {useAppDispatch} from "../../store"

const Editor: FC = () => {
    const {currentlyEdit: entry, canEdit, activeDiaryID } = useSelector((state: RootState) => state.editor)

const [editedEntry, updatedEditEntry] = useState(entry);
const dispatch = useAppDispatch();

const saveEntry = async () => {
    if(activeDiaryID == null){
        return showAlert("Please select a diary", "warning")
    }
    if(entry == null){
        http
        .post<Entry, {diary: Diary; entry: Entry}>(
            `diary/entry/${activeDiaryID}`,
            editedEntry
        )
        .then((data) => {
            if(data != null){
                const {diary, entry: _entry} = data
                dispatch(setCurrentlyEdit(_entry))
                dispatch(updateDiary(diary))
            }
        });

    }else {
        http
        .put<Entry, Entry>(`diary/entry/${entry.id}`, editedEntry)
        .then((_entry) => {
            if(_entry != null){
                dispatch(setCurrentlyEdit(_entry))
                dispatch(updateEntry(_entry))
            }
        })
    }
    dispatch(setCanEdit(false))
}
useEffect(() => {
    updatedEditEntry(entry)
}, [entry])
return (
    <div className="editor">
        <header
        style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "0.2em",
            paddingBottom: "0.2em",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}>
            {entry && !canEdit ? (
                <h4>
                    {entry.title}
                    <a href="#edit" onClick={(e) => {
                        e.preventDefault();
                        if(entry != null){
                            dispatch(setCanEdit(true))
                        }
                    } } style={{marginLeft: "0.4em"}}>
                        (Edit)
                    </a>
                </h4>
            ): (
                <input value={editedEntry?.title ?? ""}
                disabled={!canEdit}
                onChange={(e) => {
                    if (editedEntry){
                        updatedEditEntry({
                            ...editedEntry,
                            title: e.target.value
                        });
                    }else {
                        updatedEditEntry({
                            title: e.target.value,
                            content: ""
                        })
                    }
                }}
                />
            )}
            
        </header>

        {entry && !canEdit ? (
            <Markdown>{entry.content}</Markdown>
        ): (
            <> 
                <textarea
                disabled={!canEdit}
                placeholder="Supports markdown!"
                value={editedEntry?.content ?? ""}
                onChange={(e) => {
                    if(editedEntry){
                        updatedEditEntry({
                            ...editedEntry,
                            content: e.target.value,
                        });
                    } else(
                        updatedEditEntry({
                            title: "",
                            content: e.target.value,
                        })
                    )
                }}
                />
                <button onClick={saveEntry} disabled={!canEdit}>
                    Save
                </button>
            
            </>
        )}
    </div>
)
};
export default Editor;