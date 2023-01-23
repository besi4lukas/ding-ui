import React, { useState } from 'react';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Row, Button, Modal, Alert  } from 'antd';
import PinField from "react-pin-field";
import { checkNumberGuess } from './utils';

const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 700
  };

const heading = {
    textAlign: 'start',
    fontSize: '20px',
    textShadow: "2px 2px 2px #A89CC9"
}

const subHeading = {
    textAlign: 'start',
    fontSize: '14px',
    height: 120,
    marginTop: '50px',
    paddingLeft: '20px'
}

const hintStyle = {
    textAlign: 'center',
    fontSize: '24px',
}

const buttonStyle = {
    fontSize: '18px',
    marginTop: '20px',
    fontWeight: 'bold'
}

const numberInputStyle = {
    height: 120,
    paddingTop: '50px'
}

const infoTextStyle = {
    textAlign: 'center',
    fontSize: '10px',
    marginTop: '30px',
    height: 100
}

const GamePageComponent = ({ 
    setShowGameBoard, 
    inputLength, 
    guessNumber,
    setInputLength }) => {
    const [winModal, setWinModal] = useState(false);
    const [closeGameModal, setCloseGameModal] = useState(false);
    const [code, setCode] = useState("");
    const [completed, setCompleted] = useState(false);
    const [showAlert, setshowAlert] = useState(false);
    const [dead, setDead] = useState(0);
    const [inj, setInjured] = useState(0);

    const closeGame = () => {
        setCloseGameModal(false);
        setShowGameBoard(false);
        setInputLength(3);
    }

    const checkGuess = () => {
        if (completed){
            let check = checkNumberGuess(guessNumber, code.toString().split(""));
            setDead(check.dead);
            setInjured(check.inj);

            if(check.isWinner){
                setWinModal(true);
            }
        }else{
            setshowAlert(true);
            setTimeout(() => {
                setshowAlert(false);
              }, "6000")
        }
    }

    const onChange = (value) => {
        setCode(value);
    };

    return(
        <Row>
            <Col span={24}>
                <div style={headerStyle}> 
                    <div style={heading}><Button type="text" icon={<CloseOutlined />} onClick={() => setCloseGameModal(true)}> Close Game </Button></div>
                   {showAlert &&  <Alert message="Enter all the numbers before guessing" type="warning" showIcon closable />}
                    <div style={subHeading}>
                        <div style={hintStyle}>
                            {`Hint: ${dead} Dead ${inj} Injured`}
                        </div>
                        <div style={infoTextStyle}>
                            <p>Dead numbers are correct numbers in the right position</p>
                            <p>Injured numbers are correct numbers in the wrong position</p>
                        </div>
                    </div>
                    <div style={numberInputStyle}>
                        <PinField
                            className="field-a"
                            length={inputLength}
                            validate={/^[0-9]$/}
                            onChange={onChange}
                            onComplete={() => setCompleted(true)}
                            format={k => k.toUpperCase()}
                        />
                    </div>
                    <div style={buttonStyle}>
                        <Button type="primary" icon={<CheckCircleOutlined />} size='large' onClick={() => checkGuess()} >
                            Check Guess
                        </Button>
                    </div>

                </div>
            </Col>

            <Modal
                title="Do you want to close current game ?"
                centered
                open={closeGameModal}
                closable={false}
                footer={[
                    <Button key="back" onClick={() => setCloseGameModal(false)}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => closeGame()}>
                      Close Game
                    </Button>,
                  ]}
            >
                <p>This action will end the current game!</p>
            </Modal>
            <Modal
                title="DING!"
                centered
                open={winModal}
                closable={false}
                footer={[
                    <Button key="submit" type="primary" onClick={() => closeGame()}>
                      CLOSE GAME BOARD
                    </Button>,
                  ]}
            >
               <p>Congratulations! You guessed right</p>
            </Modal>
        </Row>
    );
}

export default GamePageComponent;