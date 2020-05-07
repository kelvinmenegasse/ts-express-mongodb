import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

const MiddlewaresArray = [
    morgan('dev'),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    cors(),
];


export default MiddlewaresArray;