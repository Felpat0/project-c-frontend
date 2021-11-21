import React from 'react';
import { Stores } from './types';

export const StoresContext = React.createContext<Stores | null>(null);