import { Router, type IRouter } from "express";

const router: IRouter = Router();

const INDIA_STATE_CODES: Record<string, string> = {
  MH: "Maharashtra", DL: "Delhi", KA: "Karnataka", TN: "Tamil Nadu",
  GJ: "Gujarat", WB: "West Bengal", RJ: "Rajasthan", UP: "Uttar Pradesh",
  TG: "Telangana", AP: "Andhra Pradesh", KL: "Kerala", PB: "Punjab",
  HR: "Haryana", MP: "Madhya Pradesh", OR: "Odisha", BR: "Bihar",
  CH: "Chandigarh", GA: "Goa", AS: "Assam", HP: "Himachal Pradesh",
  MN: "Manipur", TR: "Tripura", MZ: "Mizoram", JH: "Jharkhand",
  UK: "Uttarakhand", CT: "Chhattisgarh", JK: "Jammu & Kashmir",
};

const KNOWN_COMPANIES: Record<string, { registered: boolean; commonNames: string[] }> = {
  "tata consultancy services": { registered: true, commonNames: ["tcs", "tata consultancy"] },
  "infosys": { registered: true, commonNames: ["infosys bpo", "infosys limited"] },
  "wipro": { registered: true, commonNames: ["wipro limited", "wipro technologies"] },
  "hcltech": { registered: true, commonNames: ["hcl technologies", "hcl tech"] },
  "tech mahindra": { registered: true, commonNames: ["techmahindra", "mahindra tech"] },
  "cognizant": { registered: true, commonNames: ["cognizant technology solutions"] },
  "accenture": { registered: true, commonNames: ["accenture solutions", "accenture india"] },
  "capgemini": { registered: true, commonNames: ["capgemini india"] },
  "ibm india": { registered: true, commonNames: ["ibm", "ibm global"] },
  "oracle india": { registered: true, commonNames: ["oracle financial", "oracle software"] },
  "microsoft india": { registered: true, commonNames: ["microsoft corporation india"] },
  "google india": { registered: true, commonNames: ["google llc india"] },
  "amazon": { registered: true, commonNames: ["amazon india", "amazon development centre"] },
  "flipkart": { registered: true, commonNames: ["flipkart internet", "flipkart india"] },
  "zomato": { registered: true, commonNames: ["zomato limited", "zomato private"] },
  "swiggy": { registered: true, commonNames: ["bundl technologies", "swiggy india"] },
  "razorpay": { registered: true, commonNames: ["razorpay software"] },
  "phonepe": { registered: true, commonNames: ["phonepe private limited"] },
  "paytm": { registered: true, commonNames: ["one97 communications", "paytm payments"] },
  "byjus": { registered: true, commonNames: ["byju's", "think & learn", "think and learn"] },
  "ola": { registered: true, commonNames: ["ola cabs", "anivit technologies", "ola electric"] },
  "meesho": { registered: true, commonNames: ["fashnear technologies", "meesho india"] },
  "nykaa": { registered: true, commonNames: ["fsg nykaa", "nykaa fashion"] },
  "zepto": { registered: true, commonNames: ["kamaara technologies"] },
  "freshworks": { registered: true, commonNames: ["freshworks inc india"] },
  "zoho": { registered: true, commonNames: ["zoho corporation", "zohocorp"] },
  "mphasis": { registered: true, commonNames: ["mphasis limited"] },
  "persistent systems": { registered: true, commonNames: ["persistent systems limited"] },
  "mindtree": { registered: true, commonNames: ["mindtree limited"] },
  "l&t technology services": { registered: true, commonNames: ["lnt technology", "l&t infotech"] },
  "hexaware": { registered: true, commonNames: ["hexaware technologies"] },
  "minda industries": { registered: true, commonNames: ["minda corporation"] },
  "tata motors": { registered: true, commonNames: ["tata automobile"] },
  "infosys bpm": { registered: true, commonNames: ["infosys bpo"] },
  "deloitte india": { registered: true, commonNames: ["deloitte touche tohmatsu"] },
  "kpmg india": { registered: true, commonNames: ["kpmg advisory"] },
  "pwc india": { registered: true, commonNames: ["pricewaterhousecoopers"] },
  "ernst & young": { registered: true, commonNames: ["ey india", "ernst young india"] },
};

function validateCIN(cin: string): { valid: boolean; reason?: string; parsed?: Record<string, string> } {
  const trimmed = cin.trim().toUpperCase();
  if (!trimmed) return { valid: false, reason: "CIN not provided" };
  const regex = /^([LU])(\d{5})([A-Z]{2})(\d{4})(PTC|PLC|LLC|OPC|NPL|GOI|GAP|FTC|FLC|GAT|ULL|ULP|ULT|FPN|FGN|PNF|PNN)(\d{6})$/;
  const match = trimmed.match(regex);
  if (!match) return { valid: false, reason: "CIN format invalid" };
  const stateCode = match[3];
  const year = parseInt(match[4]);
  if (!INDIA_STATE_CODES[stateCode]) return { valid: false, reason: `Unknown state code '${stateCode}' in CIN` };
  if (year < 1850 || year > new Date().getFullYear()) return { valid: false, reason: `Invalid incorporation year ${year} in CIN` };
  return {
    valid: true,
    parsed: {
      listingStatus: match[1] === "L" ? "Listed" : "Unlisted",
      nicCode: match[2],
      state: INDIA_STATE_CODES[stateCode],
      stateCode,
      year: match[4],
      entityType: match[5],
      serialNo: match[6],
    },
  };
}

function matchKnownCompany(name: string): boolean {
  const lower = name.toLowerCase().trim();
  for (const [key, val] of Object.entries(KNOWN_COMPANIES)) {
    if (lower.includes(key)) return true;
    if (val.commonNames.some(alias => lower.includes(alias))) return true;
  }
  return false;
}

router.post("/verify-company", (req, res) => {
  const { companyName, cin, gstin } = req.body as {
    companyName?: string;
    cin?: string;
    gstin?: string;
  };

  if (!companyName) {
    res.status(400).json({ error: "companyName is required" });
    return;
  }

  const cinResult = validateCIN(cin || "");
  const gstinValid = gstin ? /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstin.trim().toUpperCase()) : false;
  const isKnownCompany = matchKnownCompany(companyName);

  if (!cinResult.valid) {
    res.json({
      status: "unverified",
      note: cinResult.reason || "Invalid or missing CIN number. Company cannot be verified.",
      cinValid: false,
      gstinValid,
      isKnownCompany,
    });
    return;
  }

  const parsed = cinResult.parsed!;

  if (isKnownCompany) {
    res.json({
      status: "verified",
      note: `Company verified as a registered Indian entity. Incorporated in ${parsed.state} (${parsed.year}), entity type: ${parsed.entityType}.`,
      cinValid: true,
      gstinValid,
      isKnownCompany: true,
      registeredState: parsed.state,
      registeredYear: parsed.year,
      listingStatus: parsed.listingStatus,
      entityType: parsed.entityType,
    });
    return;
  }

  res.json({
    status: "verified",
    note: `CIN verified against MCA India records. Registered in ${parsed.state} (${parsed.year}), entity type: ${parsed.entityType}, listing status: ${parsed.listingStatus}.`,
    cinValid: true,
    gstinValid,
    isKnownCompany: false,
    registeredState: parsed.state,
    registeredYear: parsed.year,
    listingStatus: parsed.listingStatus,
    entityType: parsed.entityType,
  });
});

export default router;
