import React from 'react';
import ReactDOM from 'react-dom/client';
import { mockData } from './data/mockData';
import { TableWithMultipleRecordCards } from './components/table-with-multiple-record-cards';
import './styles/main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TableWithMultipleRecordCards data={mockData} />);
