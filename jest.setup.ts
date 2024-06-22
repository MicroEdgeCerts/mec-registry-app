import '@testing-library/jest-dom';
import '@testing-library/jest-dom/jest-globals';
import { TextEncoder, TextDecoder } from 'node:util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder