Chart.defaults.global['defaultFontFamily'] = "'Raleway', sans-serif";
Chart.defaults.global['defaultFontSize'] = 16;
Chart.defaults.global['plugins']['datalabels'] = {
    display: true,
    anchor: 'end',
    align: 'end',
    offset: 5
};

function ctc_chart(element_id, data, type='horizontalBar'){
    var ctx = document.getElementById(element_id).getContext("2d");
    var myNewChart = new Chart(ctx, {
        type: type, data: data, options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    stacked: true
                }],
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false
                    },
                    stacked: true,
                    ticks: {
                        display: false,
                        min: 0
                    }
                }]
            }
        }
    });
}

ctc_chart("figure-1", {
  labels: [
    "Non-domestic rate relief",
    "Gift Aid",
    "Inheritance Tax",
    "Higher rate Gift Aid relief",
    "VAT relief*",
    "Stamp Duty Land Tax",
    "Gifts of shares and property",
    "Payroll Giving",
    "Gift Aid Small Donations Scheme"
  ],
  datasets: [
    {
      backgroundColor: "rgb(255,255,  0)",
      label: "Relief to charity",
      data: [2090, 1270, null, null, 400, 250, null, null, 30]
    },
    {
      backgroundColor: "rgb(113,  9,170)",
      label: "Relief to individuals",
      data: [null, null, 860, 490, null, null, 70, 40, null]
    }
  ]
});

ctc_chart("figure-2", {
  labels: [
    "1990-91",
    "1991-92",
    "1992-93",
    "1993-94",
    "1994-95",
    "1995-96",
    "1996-97",
    "1997-98",
    "1998-99",
    "1999-00",
    "2000-01",
    "2001-02",
    "2002-03",
    "2003-04",
    "2004-05",
    "2005-06",
    "2006-07",
    "2007-08",
    "2008-09",
    "2009-10",
    "2010-11 ",
    "2011-12",
    "2012-13",
    "2013-14",
    "2014-15",
    "2015-16",
    "2016-17",
    "2017-18"
  ],
  datasets: [
    {
      backgroundColor: "rgb(255,255,  0)",
      label: "Tax repayments",
      data: [
        470,
        560,
        580,
        610,
        670,
        740,
        760,
        730,
        820,
        820,
        650,
        630,
        640,
        670,
        660,
        780,
        860,
        920,
        970,
        1030,
        1100,
        1080,
        1060,
        1060,
        1210,
        1300,
        1280,
        1270
      ]
    },
    {
      backgroundColor: "rgb(113,  9,170)",
      label: "Relief to individuals",
      data: [null, null, 860, 490, null, null, 70, 40, null]
    }
  ]
});