let preSeatNum = '';
const talbeContainer = document.querySelector('.table-container');
talbeContainer.innerHTML = `<label>請點擊區域</label>`;

document.querySelectorAll('svg [data-seat]').forEach((el) => {
  el.addEventListener('click', () => {
    const seatNum = el.dataset.seat;
    if (preSeatNum === seatNum) return;
    fetchData(seatNum);
    preSeatNum = seatNum;
  });
});

async function fetchData(area) {
  try {
    const res = await axios.get(
      'https://sheets.googleapis.com/v4/spreadsheets/1TDPJhXduOt3sInTiPmmNfbk62mVI-XvApQbek9DNHCA/values/1?alt=json&key=AIzaSyD9CZt4la3JCyFEeogR5v7Jsk5N2oFemFY'
    );
    const lists = res?.data?.values;
    const [keys, ...values] = lists;
    let result = values.reduce((acc, row) => {
      if (row.some((x) => x === area)) {
        const obj = {};
        keys.forEach((key, i) => {
          obj[key] = row[i];
        });
        acc.push(obj);
      }
      return acc;
    }, []);

    //把排數重新排序
    result.sort((a, b) => Number(a.row) - Number(b.row));

    if (!result?.length) {
      talbeContainer.innerHTML = `<label>查無資料</label>`;
      return;
    }

    let str = ``;
    str += `
            <table class="table table-sm table-hover">
              <thead>
                <tr>
                  <th scope="col"><img src="image.png" /></th>
                  <th scope="col">位置</th>
                  <th scope="col">提供者</th>
                </tr>
              </thead>
              <tbody>
          `;
    result.forEach((x) => {
      str += ` <tr>
          <th>
            <a href="${x?.image}" class="hand" target="_blank">
              <img src="image.png">
            </a>
          </th>
              <td class="col-large">${x?.seat}</td>
              <td class="col-small">${x?.id}</td>
            </tr>`;
    });

    str += `
     </tbody>
            </table>
          `;

    talbeContainer.innerHTML = str;
  } catch (error) {
    console.error('Uh-oh! Error fetching data:', error.message);
  }
}
