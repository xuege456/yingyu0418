const axios = require("axios");

// 配置信息
const API_KEY = "你的火山引擎ARK_API_KEY";
const ENDPOINT = "https://ark.cn-beijing.volces.com.cn/api/v3/chat/completions";
const MODEL = "doubao-lite-4k"; // 豆包轻量模型

async function callDoubao() {
  try {
    const res = await axios.post(
      ENDPOINT,
      {
        model: MODEL,
        messages: [
          {
            role: "user",
            content: "用简单几句话介绍下豆包AI"
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = res.data.choices[0].message.content;
    console.log("豆包回复：", reply);
  } catch (err) {
    console.error("请求错误：", err.response?.data || err.message);
  }
}

// 执行
callDoubao();