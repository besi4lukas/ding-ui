import React, { useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Col, Row, Button, Modal, InputNumber, Divider, Steps   } from 'antd';
import { getGuessNumber, LearnGameItems } from './utils';
import { 
    headerStartStyle, 
    StartHeading, 
    startSubHeading, 
    startButtonContainerStyle, 
    startLinkContainerStyle, 
    linkStyle, 
    infoTextStyle, 
    infoTextSize, 
    buttonColor } from './dingStyle';

const StartPageComponent = ({
    setShowGameBoard, 
    setInputLength, 
    setGuessNumber, 
    inputLength
}) => {
    const [startGameModal, setStartGameModal] = useState(false);
    const [infoModal, setInfoModal] = useState(false);

    const onClickOk = () => {
        setStartGameModal(false);
        setGuessNumber(getGuessNumber(inputLength));
        setShowGameBoard(true);
    }

    const onChange = (value) => {
        setInputLength(value);
    };

    return(
        <Row>
            <Col span={24}>
                <div style={headerStartStyle}> 
                    <div style={StartHeading}>DING!</div>
                    <div style={startSubHeading}>The Number Guessing Game</div>
                    <div style={startButtonContainerStyle}>
                        <Button type="primary" icon={<PlayCircleOutlined />} style={buttonColor} size='large' onClick={() => setStartGameModal(true)} >
                            Start New Game
                        </Button>
                    </div>
                    <div style={startLinkContainerStyle}>
                        <Button type="link" onClick={() => setInfoModal(true)} style={linkStyle}>Learn to Play Ding!</Button>
                    </div>
                </div>
            </Col>
            <Modal
                title="You can guess 3 to 6 digits!"
                centered
                open={startGameModal}
                closable={false}
                footer={[
                        <Button key="back" onClick={() => setStartGameModal(false)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => onClickOk()} style={buttonColor}>
                          Join Game
                        </Button>,
                      ]}
            >
                <p style={infoTextSize}>Enter the number of digits you want to guess</p>
                <InputNumber min={3} max={6} defaultValue={3} onChange={onChange} inputMode='numeric' />
            </Modal>
            <Modal
                title="How to Play Ding!"
                centered
                open={infoModal}
                closable={false}
                footer={[
                        <Button key="back" onClick={() => setInfoModal(false)}>
                          Close 
                        </Button>,
                      ]}
            >
                <div>
                    Ding! is a number guessing game. 
                    The game generates a 3 to 6 digit number for a player to guess and provides hints on each wrong guess.
                    <Divider />
                    <Steps
                        progressDot
                        current={3}
                        direction="vertical"
                        responsive
                        items={LearnGameItems}
                    />
                    <Divider />
                    <div style={infoTextStyle}>
                            <p>Dead numbers are correct numbers in the right position</p>
                            <p>Injured numbers are correct numbers in the wrong position</p>
                    </div>
                </div>
            </Modal>
        </Row>
    );
}

export default StartPageComponent;