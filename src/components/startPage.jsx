import React, { useState } from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Col, Row, Button, Modal, InputNumber  } from 'antd';
import { getGuessNumber } from './utils';

const headerStyle = {
    textAlign: 'center',
    color: '#000',
    height: 500
  };

const heading = {
    fontSize: '96px',
    marginTop: '120px',
    textShadow: "2px 2px 2px #A89CC9"
}

const subHeading = {
    fontSize: '14px',
}

const buttonStyle = {
    fontSize: '18px',
    marginTop: '120px',
    fontWeight: 'bold'
}

const StartPageComponent = ({
    setShowGameBoard, 
    setInputLength, 
    setGuessNumber, 
    inputLength
}) => {
    const [modal2Open, setModal2Open] = useState(false);

    const onClickOk = () => {
        setModal2Open(false);
        setGuessNumber(getGuessNumber(inputLength));
        setShowGameBoard(true);
    }

    const onChange = (value) => {
        setInputLength(value);
    };

    return(
        <Row>
            <Col span={24}>
                <div style={headerStyle}> 
                    <div style={heading}>DING!</div>
                    <div style={subHeading}>The Number guessing Game</div>
                    <div style={buttonStyle}>
                        <Button type="primary" icon={<PlayCircleOutlined />} size='large' onClick={() => setModal2Open(true)} >
                            START NEW GAME
                        </Button>
                    </div>
                </div>
            </Col>
            <Modal
                title="You can guess 3 to 6 digits"
                centered
                open={modal2Open}
                closable={false}
                footer={[
                        <Button key="back" onClick={() => setModal2Open(false)}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => onClickOk()}>
                          Join Game
                        </Button>,
                      ]}
            >
                <p>Select the number of digits to guess</p>
                <InputNumber min={3} max={6} defaultValue={3} onChange={onChange} />
            </Modal>
        </Row>
    );
}

export default StartPageComponent;