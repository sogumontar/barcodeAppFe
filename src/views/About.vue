<template>
  <div id="app">
    <button v-on:click.prevent="setTime(1800)" class="btn btn-primary">Start</button>
    <center><h2> {{ timeLeft }}</h2></center>
    <div class="countdown">
      <h3>Countdown ends at <span>{{ endTime }}</span></h3>
    </div>
    <button v-on:click.prevent="refresh" class="btn btn-primary">Refresh</button>
    <qrcode :background="background" :size="size" :cls="qrCls" :value="kode"></qrcode>
    <h1>Mahasiswa yang hadir</h1>
    <div v-if="data.length!=0" class="row container">
      <b-row class="container"  v-for="data in data" :key="data.id" >
        <b-col  col lg="1" >
        </b-col>
        <b-col  col lg="5" >
        </b-col>
        <b-col col lg="2">
          <p>Nama  {{ data.nama }} </p>
          <p>Nim  {{ data.nim }} </p>
        </b-col>
      </b-row>
      <br>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import Qrcode from 'v-qrcode/src/index';
import axios from 'axios';

let intervalTimer;

export default {
  data() {
    return {
      qrCls: 'qrcode',
      qrText: '11417010',
      size: 500,
      kode: '',
      data: [],
      background: '#ffffff',
      selectedTime: 10,
      timeLeft: '00:00',
      endTime: '0',
      times: [
        {
          sec: 3,
          display: '3s',
        },
        {
          sec: 600,
          display: ' 10m',
        },
        {
          sec: 1800,
          display: '30m',
        },
      ],
    };
  },
  components: {
    Qrcode,
  },
  methods: {
    async setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
      // eslint-disable-next-line max-len
      this.kode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      axios.post(`https://barcodeapk.herokuapp.com/barcodeApp/set/${this.kode}`).then((value) => {
        console.log(value);
      });
      // eslint-disable-next-line no-undef
      const response = await axios.get(`https://barcodeapk.herokuapp.com/barcodeApp/absen/all/${this.kode}`);
      this.data = response.data;
      console.log(this.data);
    },
    async refresh() {
      const response = await axios.get(`https://barcodeapk.herokuapp.com/barcodeApp/absen/all/${this.kode}`);
      this.data = response.data;
      console.log(this.data);
    },
    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },
    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      // eslint-disable-next-line no-undef,@typescript-eslint/no-use-before-define
      this.timeLeft = `${zeroPadded(minutes)}:${zeroPadded(seconds)}`;
    },
    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      this.endTime = `${hourConvert(hour)}:${zeroPadded(minutes)}`;
    },
  },
};
function zeroPadded(num) {
  // 4 --> 04
  return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
  // 15 --> 3
  return (hour % 12) || 12;
}

</script>
<style>
  /* ==================
 *  BASE
 * ================== */
  body {
    font-family: 'Sarpanch', sans-serif;
    color: hsl(0, 0%, 7%);
    background: #f2f1ed;
    background: radial-gradient(hsl(204, 86%, 93%), hsl(204, 86%, 63%));
  }
  .outer-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
  }
  /* ==================
   *  APP
   * ================== */
  .countdown {
    margin: 5px 0 30px;
  }
  h1 {
    text-align: center;
    font-size: 18px;
    color: hsl(204, 86%, 43%);
  }
  h2 {
    font-size: 120px;
    width: 390px;
    line-height: 1;
    text-align: center;
  }
  h3 {
    font-size: 28px;
    display: flex;
    align-items: baseline;
    justify-content: center;
  }
  h3 span {
    width: 70px;
    border-bottom: 2px solid hsl(348, 100%, 71%);
    margin-left: 15px;
    text-align: center;
  }
  .time {
    display: flex;
    justify-content: center;
  }
  .columns {
    margin-left: 0;
    margin-right: 0;
  }
  /* ==================
  *  SOCIAL MEDIA
  * ================== */
  .social-media-footer {
    --font-color: hsl(204, 86%, 99%);
    --font-size: 0.8rem;
    margin-top: 1.9375rem;
  }
  .social-columns {
    display: flex;
    justify-content: center;

    padding-bottom: 0.625rem;
    font-size: var(--font-size);
    color: var(--font-color);
    width: 100%;
  }
  .social-columns .column {
    padding: 0.4rem;
    text-align: center;

    /* to work with bulma */
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }
  .social-columns a {
    text-decoration: none;
    color: var(--font-color);

    /* to work with bulma */
    padding-left: 2px;
  }
  .social-columns a:hover {
    text-decoration: underline;
  }
  /* GITHUB */
  .github-code {
    color: var(--font-color);
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 0.625rem;
  }
  .github-code a {
    text-decoration: none;
    color: var(--font-color);
  }
  .github-code a:hover {
    text-decoration: underline;
  }

</style>
