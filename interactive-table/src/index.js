import React from 'react';
import ReactDOM from 'react-dom/client';
import { mockData } from './data/mockData';
import { TableWithMultipleRecordCards } from './components/table-with-multiple-record-cards';
import './styles/main.css';
import './assets/fonts/Roboto-Black.ttf';
import './assets/fonts/Roboto-Regular.ttf';
import './assets/fonts/Roboto-Light.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TableWithMultipleRecordCards data={mockData} />);
