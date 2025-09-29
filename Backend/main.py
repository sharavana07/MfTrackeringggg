# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import time
import yfinance as yf  # ✅ Using yfinance

app = FastAPI(title="Stock Dashboard - Real Data vs Baseline (13-Aug-2025)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Stock symbols (NSE codes)
SYMBOLS = {
    "Eternal Ltd": "ETERNAL.NS",
    "Bharat Electronics": "BEL.NS",
    "Waaree": "WAAREEENER.NS",
    "CG Power": "CGPOWER.NS",
    "Siemens": "SIEMENS.NS",
    "Amber Enterprises": "AMBER.NS",
    "Multi Commodity (MCX)": "MCX.NS",
    "One97 (Paytm)": "PAYTM.NS",
    "Cholamandalam Inv Fin": "CHOLAFIN.NS",
    "Samvardhana Motherson": "MOTHERSON.NS",
    "PTC": "PTC.NS",
    "Suzlon": "SUZLON.NS",
    "Apar Industries": "APARINDS.NS",
    "Bajaj Finance": "BAJFINANCE.NS",
    "Prestige": "PRESTIGE.NS",
    "GE Power India": "GEPIL.NS",
    "Hindustan Aeronautics": "HAL.NS",
    "OneSource Pharma": "ONESOURCE.NS",
    "Bharat Dynamics": "BDL.NS",
    "Trent": "TRENT.NS",
    "Kaynes": "KAYNES.NS",
    "Zen Technologies": "ZENTEC.NS",
    "Muthoot Finance": "MUTHOOTFIN.NS",
    "Inox Wind": "INOXWIND.NS",
    "Dixon": "DIXON.NS",
    "Gujarat Fluorochem": "GUJFLUORO.NS",
    "Religare": "RELIGARE.NS",
    "V2 Retail": "V2RETAIL.NS",
    "Angel One": "ANGELONE.NS",
    "PB Fintech": "POLICYBZR.NS",
    "Kalyan Jewellers": "KALYANKJIL.NS",
    "K.P.R. Mills": "KPRMILL.NS",
    "TVS Motors": "TVSMOTOR.NS",
}

# ✅ Baseline prices on 13-Aug-2025
BASELINE = {
    "Eternal Ltd": 312,
    "Bharat Electronics": 388,
    "Waaree": 2941,
    "CG Power": 670,
    "Siemens": 3150,
    "Amber Enterprises": 6945,
    "Multi Commodity (MCX)": 8339,
    "One97 (Paytm)": 1155,
    "Cholamandalam Inv Fin": 1460,
    "Samvardhana Motherson": 93,
    "PTC": 188,
    "Suzlon": 60,
    "Apar Industries": 8748,
    "Bajaj Finance": 860,
    "Prestige": 1628,
    "GE Power India": 950,
    "Hindustan Aeronautics": 4524,
    "OneSource Pharma": 1896,
    "Bharat Dynamics": 1591,
    "Trent": 5398,
    "Kaynes": 6060,
    "Zen Technologies": 1421,
    "Muthoot Finance": 2509,
    "Inox Wind": 137,
    "Dixon": 15952,
    "Gujarat Fluorochem": 1600,
    "Religare": 263,
    "V2 Retail": 1720,
    "Angel One": 2631,
    "PB Fintech": 1852,
    "Kalyan Jewellers": 515,
    "K.P.R. Mills": 968,
    "TVS Motors": 3019,
}


@app.get("/")
def root():
    return {"message": "Welcome to your FastAPI backend!"}


@app.get("/ping")
def ping():
    return {"status": "ok", "ts": time.time()}


# ✅ Helper: fetch current price from Yahoo Finance
def fetch_from_yf(symbol: str):
    """
    Fetch latest market price from Yahoo Finance
    """
    try:
        ticker = yf.Ticker(symbol)
        data = ticker.history(period="1d")
        if not data.empty:
            latest_close = float(data['Close'].iloc[-1])
            return latest_close
    except Exception as e:
        print(f"[Yahoo Finance Error] {symbol}: {e}")
    return None


@app.get("/stocks")
def get_stocks():
    out = []
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for name, sym in SYMBOLS.items():
        baseline = BASELINE.get(name)
        current = fetch_from_yf(sym)

        if current is not None and baseline:
            abs_change = current - baseline
            change_pct = (abs_change / baseline) * 100
            trend = "UP 🔼" if abs_change > 0 else "DOWN 🔽" if abs_change < 0 else "NEUTRAL ➖"
        else:
            abs_change = None
            change_pct = None
            trend = "N/A"

        out.append({
            "name": name,
            "symbol": sym,
            "baseline": baseline,
            "current": round(current, 2) if current else None,
            "abs_change": round(abs_change, 2) if abs_change is not None else None,
            "change_pct": f"{change_pct:.2f}%" if change_pct is not None else None,
            "trend": trend,
            "source": "Yahoo Finance",
            "last_updated": now
        })

    return {"data": out}

@app.get("/summary")
def get_summary():
    stocks = get_stocks().get("data", [])
    valid_stocks = [s for s in stocks if s["abs_change"] is not None]

    sorted_stocks = sorted(valid_stocks, key=lambda x: float(x["change_pct"].replace("%", "")), reverse=True)
    top_gainers = sorted_stocks[:5]
    top_losers = sorted(valid_stocks, key=lambda x: float(x["change_pct"].replace("%", "")))[:5]

    avg_change = round(sum(float(s["change_pct"].replace("%", "")) for s in valid_stocks) / len(valid_stocks), 2) if valid_stocks else 0

    trend = "up" if avg_change > 0 else "down" if avg_change < 0 else "neutral"

    return {
        "top_gainers": top_gainers,
        "top_losers": top_losers,
        "portfolio_avg_change": avg_change,
        "trend": trend
    }
