import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Col, Row, Button, Modal, message, Divider  } from 'antd';
import PinField from "react-pin-field";
import { checkNumberGuess, maxTries } from './utils';
import { 
    headerGameStyle, 
    gameHeading, 
    gameSubHeading, 
    hintStyle, 
    numberInputStyle, 
    gameInfoTextStyle, 
    maxTextStyle, 
    gameButtonContainerStyle,
    buttonColor } from './dingStyle';

const GamePageComponent = ({ 
    setShowGameBoard, 
    inputLength, 
    guessNumber,
    setInputLength }) => {
    const [winModal, setWinModal] = useState(false);
    const [closeGameModal, setCloseGameModal] = useState(false);
    const [code, setCode] = useState("");
    const [completed, setCompleted] = useState(false);
    const [dead, setDead] = useState(0);
    const [inj, setInjured] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const [tries, setTries] = useState(maxTries[inputLength]);
    const [winner, setWinner] = useState(false);

    const closeGame = () => {
        setCloseGameModal(false);
        setShowGameBoard(false);
        setInputLength(3);
    }

    const checkWarning = () => {
        messageApi.open({
          type: 'warning',
          content: 'Enter all numbers before guessing',
          duration: 5,
        });
    };

    const checkGuess = () => {
        if (completed){
            let check = checkNumberGuess(guessNumber, code.toString().split(""));
            setTries(tries - 1);
            setWinner(check.isWinner);
            setDead(check.dead);
            setInjured(check.inj);
           

            if(check.isWinner){
                setWinModal(true);
            }else if (check.isWinner === false && tries - 1 > 0){
                messageApi
                .open({
                    type: 'loading',
                    content: 'Check in progress..',
                    duration: 2.5,
                })
                .then(() => message.warning('Wrong Guess! Try Again', 1.5))
                .then(() => message.info('Check hint for more help', 2.5));
            }
        }else{
            checkWarning();
        }
    }

    const onChange = (value) => {
        setCode(value);
    };

    useEffect(()=>{
        if(tries === 0){
            setWinModal(true);
        }
    },[tries, setTries])
    

    return(
        <Row>
            {contextHolder}
            <Col span={24}>
                <div style={headerGameStyle}> 
                    <div style={gameSubHeading}>
                        <div style={hintStyle}>
                            {`Hint: ${dead} Dead ${inj} Injured`}
                        </div>
                        <div style={gameInfoTextStyle}>
                            <p>Dead numbers are correct numbers in the right position</p>
                            <p>Injured numbers are correct numbers in the wrong position</p>
                        </div>
                    </div>
                    <div style={numberInputStyle}>
                        <div style={maxTextStyle}>
                            <p>{`Max Tries: ${tries}`}</p>
                        </div>
                        <PinField
                            className="field-a"
                            length={inputLength}
                            validate={/^[0-9]$/}
                            onChange={onChange}
                            onComplete={() => setCompleted(true)}
                            format={k => k.toUpperCase()}
                            inputMode='numeric'
                        />
                    </div>
                    <div style={gameButtonContainerStyle}>
                        <Button type="primary" icon={<CheckCircleOutlined />} size='large' onClick={() => checkGuess()} style={buttonColor}>
                            Check Guess
                        </Button>
                    </div>
                    <div style={gameHeading}>
                        <Button type="text" icon={<CloseOutlined />} onClick={() => setCloseGameModal(true)}> Close Game </Button>
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
                      No
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => closeGame()} danger>
                      Yes - Close Game
                    </Button>,
                  ]}
            >
                <p>This action will end the current game!</p>
            </Modal>
            <Modal
                title={winner ? `Congratulations!!!` : `Game Over!`}
                centered
                open={winModal}
                closable={false}
                footer={[
                    <Button key="submit" type="primary" onClick={() => closeGame()} style={buttonColor}>
                      Close Game
                    </Button>,
                  ]}
            >
                <p> 
                    { winner 
                    ? `You got it right, With ${tries} tries left!` 
                    : `You Lost! The number is ${guessNumber.join("")} Try Again!`}  
                </p>
                <Divider />
            </Modal>
        </Row>
    );
}

export default GamePageComponent;