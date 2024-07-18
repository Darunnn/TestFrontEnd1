import React, { useState, useEffect, lazy } from 'react';
import { Button, Layout, Row, Col, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import './App.scss';

const { Header, Content } = Layout;
const { Option } = Select;

const initialShapes = [
  'circle', 'oval', 'rectangle', 'square',
  'parallelogram', 'trapezoid'
];

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [positions, setPositions] = useState(initialShapes);
  const [shapeRotation, setShapeRotation] = useState(0);
  const [displayText, setDisplayText] = useState(t('EN'));
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng)
  };
  const handleMoveShapeLeft = (index: number) => {
    const newPositions = [...positions];
    if (index === 0) {
      newPositions.push(newPositions.shift()!);
    } else {
      [newPositions[index - 1], newPositions[index]] = [newPositions[index], newPositions[index - 1]];
    }
    setPositions(newPositions);
  };

  const handleMoveShapeRight = (index: number) => {
    const newPositions = [...positions];
    if (index === newPositions.length - 1) {
      newPositions.unshift(newPositions.pop()!);
    } else {
      [newPositions[index], newPositions[index + 1]] = [newPositions[index + 1], newPositions[index]];
    }
    setPositions(newPositions);
  };


  const handleRandomizePositions = () => {
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    setPositions(shuffledPositions);
  };
  const handleMovePosition = () => {
    const newPositions = [...positions];
    const firstRow = newPositions.slice(0, 3);
    const secondRow = newPositions.slice(3, 6);
    setPositions([...secondRow, ...firstRow]);
  };

  useEffect(() => {
    setDisplayText(t(selectedLanguage.toUpperCase()));
  }, [selectedLanguage, t]);

  return (
    <Layout className="layout">
     <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
  <Select value={displayText} onChange={changeLanguage} style={{ width: 120 }}>
    <Option value="en">{t('EN')}</Option>
    <Option value="th">{t('TH')}</Option>
  </Select>
</Header>
      <Content>
        <Row justify="center" gutter={[16, 16]}>
          <Col >
            <Col onClick={() => handleMoveShapeLeft(0)} className='box'>
              <div className='triangleLeft' />
            </Col>
            <Button style={{ position: 'relative', bottom: '10px', left: '50px' }}>{t('Move Shape')}</Button>
          </Col>
          <Col>
            <Col onClick={handleMovePosition} className='box'>
              <div className='triangleTop' />
              <div className='triangleUnder' />
            </Col>
            <Button style={{ position: 'relative', bottom: '10px', left: '50px' }}>{t('Move Position')}</Button>
          </Col>

          <Col>
            <Col onClick={() => handleMoveShapeRight(positions.length - 1)} className='box'>
              <div className='triangleRight' />
            </Col>
            <Button style={{ position: 'relative', bottom: '10px', left: '50px' }}>{t('Move Shape')}</Button>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          {positions.slice(0, 3).map((shape, index) => (
            <Col key={index} onClick={handleRandomizePositions} className='box'>
              <div className={`shape ${shape}`} style={{ transform: `rotate(${shapeRotation}deg)` }} />
            </Col>
          ))}
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          {positions.slice(3).map((shape, index) => (
            <Col key={index} onClick={handleRandomizePositions} className='box'>
              <div className={`shape ${shape}`} style={{ transform: `rotate(${shapeRotation}deg)` }} />
            </Col>
          ))}
        </Row>
      </Content>

    </Layout>
  );
};

export default App;
