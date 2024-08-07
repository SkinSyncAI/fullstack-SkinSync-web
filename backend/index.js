const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = 3000; // 서버 포트 번호

app.use(cors());
// 미들웨어 설정
app.use(bodyParser.json()); // JSON 요청 본문을 파싱합니다
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 요청 본문을 파싱합니다

// CSV 파일 경로
const csvFilePath = path.join(__dirname, 'list.cosmetic-1.csv');


// CSV에서 이름으로 검색하고 인덱스 반환하는 함수
function searchNameIndex(query) {
    const results = [];
    let index = -1;

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Assuming 'name' is the column to search
            if (row.name && row.name.includes(query)) {
                index = results.length; // Save the index of the matching row
            }
            results.push(row); // Save all rows (optional, for debugging or other purposes)
        })
        .on('end', () => {
            callback(index);
        });
}

// CSV 파일에서 인덱스를 검색하는 함수
// async function searchNameIndex(query) {
//     return new Promise((resolve, reject) => {
//         const results = [];
//         let indexFound = null;

//         fs.createReadStream('list.cosmetic-1.csv')
//             .pipe(csv())
//             .on('data', (row) => {
//                 // Check the row content
//                 console.log('Row Data:', row);

//                 // Check if row contains the name and matches the query
//                 if (row.name && row.name.includes(query)) {
//                     indexFound = row.index; // Modify this if the column name is different
//                     results.push(row);
//                 }
//             })
//             .on('end', () => {
//                 if (indexFound !== null) {
//                     console.log('Found Index:', indexFound); // Debug output
//                     resolve(indexFound);
//                 } else {
//                     console.log('No matching index found.');
//                     resolve(null);
//                 }
//             })
//             .on('error', (error) => {
//                 console.error('Error reading CSV file:', error);
//                 reject(error);
//             });
//     });
// }

app.post('/api/submit', async (req, res) => {
    try {
        const data = req.body;
        const query = req.body.query;
        console.log('search text:',query)
        
        // DB 상에서 화장품 index 추출
        const cosmetic = await searchNameIndex(query)
        if (cosmetic === null) {
            return res.status(404).json({ error: 'Index not found for the query' });
        }
        console.log('cosmetic:',cosmetic)

        const dataToSend = {
            cosmetic,
            ...data
        };
        delete dataToSend.query;
        console.log('Send data:', dataToSend)

        // // 첫 번째 API 요청을 외부 API로 보냅니다
        // const response = await axios.post('http://ssai1.gcp.ext.cloud.gyk.kr:8080/ai/v1/scoring', dataToSend, {
        //     headers: {
        //         'Content-Type': 'application/json'  // JSON 데이터 형식을 명시
        //     }
        // });

        // // 응답에서 ticketToken을 추출합니다
        // const ticketToken = response.data.token;
        // console.log('Response token :', ticketToken);
        // if (!ticketToken) {
        //     return res.status(400).json({ error: 'No ticket token received' });
        // }

        // // 두 번째 GET 요청을 외부 API로 보냅니다
        // const finalResponse = await axios.get('http://ssai1.gcp.ext.cloud.gyk.kr:8080/ai/v1/scoring', {
        //     headers: {
        //         'Authorization': `Bearer ${ticketToken}`,  // 토큰을 Authorization 헤더에 추가
        //         'Content-Type': 'application/json'  // JSON 데이터 형식을 명시
        //     }
        // });

        // // 최종 데이터 반환
        // res.json(finalResponse.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// post /api/submit 엔드포인트
// app.post('/api/submit', async (req, res) => {
//     try {
//         const data = req.body;
//         const query = req.body.query;
        
//         // DB 상에서 화장품 index 추출
//         const cosmetic = await searchNameIndex(query);
//         if (cosmetic === null){
//             return res.status(404).json({error:'Index not found for the query'});
//         }

//         const dataToSend = {
//             cosmetic,
//             ...data
//         };
//         delete dataToSend.query;

//         // 첫 번째 API 요청을 외부 API로 보냅니다
//         const response = await axios.post('http://ssai1.gcp.ext.cloud.gyk.kr:8080/v1/scoring', dataToSend,{
//             headers:{
//                 'Content-Type': 'application/json'  // JSON 데이터 형식을 명시
//             }
//         });

//         // 응답에서 ticketToken을 추출합니다
//         const ticketToken = response.data.token;
//         if (!ticketToken) {
//             return res.status(400).json({ error: 'No ticket token received' });
//         }

//         // 두 번째 GET 요청을 외부 API로 보냅니다
//         const finalResponse = await axios.get('http://ssai1.gcp.ext.cloud.gyk.kr:8080/v1/scoring', {
//             headers: {
//                 'Authorization': `Bearer ${ticketToken}`,  // 토큰을 Authorization 헤더에 추가
//                 'Content-Type': 'application/json'
//             }
//         });
        

//         // 최종 데이터 반환
//         res.json(finalResponse.data);

//         // if (query){
//         //     searchNameIndex(query,(index) => {
//         //         if (index ===-1){
//         //             es.status(404).json({ message: 'No matching name found' });
//         //         }else{
//         //             res.json({
//         //                 index,
//         //                 success: true,
//         //                 message: 'Data processed successfully'
//         //             });
//         //         } 
//         //     });
//         // }else{
//         //     res.status(400).json({ error: 'Query parameter is missing' });
//         // }

//         // Log the received data to the console
//         console.log('Received Data:', data);
//         // const modelApiUrl = 'http://127.0.0.1/ai';
//         // const modelApiResponse = await axios.post(modelApiUrl, data);
        
//         // 클라이언트에게 성공 응답 전송
//         // res.json({
//         //     success: true,
//         //     message: 'Data processed successfully',
//         //     // modelApiResponse: modelApiResponse.data
//         // });

        

//         // Process the data (for example, store it in a database or perform validation)
//         // For now, we'll just send a success response back to the client
//         // res.json({ message: 'Data received successfully', data: data });
//     } catch (error) {
//         // console.error('Error:', error.message);
//         // // 클라이언트에게 에러 응답 전송
//         // res.status(500).json({
//         //     success: false,
//         //     message: 'An error occurred while processing the data',
//         //     error: error.message
//         // });a
//         console.error('Error:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Internal Server Error' });

//     }
    
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
