import React, {Fragment, useState} from "react";
import styled from 'styled-components';
import createEmojiPlugin from "@draft-js-plugins/emoji";
import createToolbarPlugin, {Separator} from "@draft-js-plugins/static-toolbar";
import {EditorState, convertToRaw} from "draft-js";
import {
    BlockquoteButton,
    BoldButton,
    HeadlineOneButton, HeadlineThreeButton,
    HeadlineTwoButton,
    ItalicButton, OrderedListButton,
    UnderlineButton, UnorderedListButton
} from "@draft-js-plugins/buttons";
import Editor from "@draft-js-plugins/editor";
import createUndoPlugin from "@draft-js-plugins/undo";
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/emoji/lib/plugin.css';
import '@draft-js-plugins/undo/lib/plugin.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';

const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin: 10px;
  box-shadow: inset 0px 1px 8px -3px #ABABAB;
  background: #fefefe;
  width: 100%;
  font-size: 18px;
`;

const EditorWrapper = styled.div`
    width: 800px;
    display: grid;
    grid-template-rows: 1fr 6fr 1fr;
`;


const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

const StyledEditor = styled.div`
  box-sizing: border-box;
  border: 1px solid #ddd;
  cursor: text;
  padding: 16px;
  border-radius: 2px;
  margin: 10px;
  box-shadow: inset 0px 1px 8px -3px #ABABAB;
  background: #fefefe;
  width: 100%;
  display: grid;
  gap: 16px;
  grid-template-rows: ${props => props.customStyle ?
    `${props.customStyle.height - props.customStyle.editor.height} 
           ${props.customStyle}
           ${props.customStyle.height - props.customStyle.editor.height}` : "40px 300px 40px"};
`;

const Flexbox = styled.div`
    display: flex;
    gap: 8px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  border: 1px solid #ABABAB;
  cursor: text;
  padding: 8px;
  border-radius: 2px;
  margin: 10px;
  width: 100%;
  height: 60px;
  background-color: green;
  color: white;
  font-size: 16px;
  box-shadow: 1px 4px 3px #ABABAB;
  letter-spacing: 2px;
  
  &:hover {
    background-color: darkolivegreen;
  }
`

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            editor: false,
            wrapper: React.createRef(),
            title: ""
        };
        this.onChange = editorState => this.setState({editorState});
    }

    componentDidMount() {
        this.setState({
            editor: true
        })
    }

    _onTitleChange(title) {
        this.setState({...this.state, title})
    }

    _onSubmit(){
        const content = convertToRaw(this.state.editorState.getCurrentContent());
        const blob = new Blob([JSON.stringify({title: this.state.title, content})], {type : 'application/json'});
        fetch("/api/publish", {method: "POST", body: blob}).then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${ res.status }, ${res.body}`);
            }
            return res.blob();
        });
    }

    focus = () => {
        this.state.wrapper.current.focus();
    };

    render() {
        const { editor, editorState, wrapper } = this.state;
        return (
            <EditorWrapper>
                <StyledInput type="text" placeholder="Title" onChange={(e) => this._onTitleChange(e.target.value)}/>
                <StyledEditor onClick={this.focus}>
                    {editor &&
                        <Fragment>
                            <Toolbar>
                                {(externalProps) => (
                                    <Fragment>
                                        <BoldButton {...externalProps} />
                                        <ItalicButton {...externalProps} />
                                        <UnderlineButton {...externalProps} />
                                        <Separator {...externalProps} />
                                        <HeadlineOneButton {...externalProps} />
                                        <HeadlineTwoButton {...externalProps} />
                                        <HeadlineThreeButton {...externalProps} />
                                        <UnorderedListButton {...externalProps} />
                                        <OrderedListButton {...externalProps} />
                                        <BlockquoteButton {...externalProps} />
                                    </Fragment>
                                )
                                }
                            </Toolbar>
                            <Editor
                                ref={wrapper}
                                editorState={editorState}
                                onChange={this.onChange}
                                placeholder="Write something!"
                                plugins={[emojiPlugin, toolbarPlugin, undoPlugin]}
                            />
                            <Flexbox>
                                <div>
                                    <EmojiSuggestions />
                                    <EmojiSelect />
                                </div>
                                <UndoButton />
                                <RedoButton />
                            </Flexbox>
                        </Fragment>

                    }
                </StyledEditor>
                <StyledButton onClick={this._onSubmit.bind(this)}>Push me to publish!</StyledButton>
            </EditorWrapper>
        );
    }
}