# PawCare
This project aims to enhance the welfare of stray animals by leveraging digital tracking and management technologies. The lack of centralized data and real-time monitoring for stray dogs often results in delayed medical care, uncoordinated vaccination efforts, and inefficient adoption processes. To address these challenges, a comprehensive web and mobile platform was developed, incorporating geolocation tracking, automated notifications, and centralized record-keeping for medical and adoption details. Feedback from workshops and surveys with volunteers and NGOs led to significant improvements in response times and care coordination. The system has improved disease control and community safety through timely interventions and responsible adoptions. Future plans include integrating AI for predictive analysis and expanding regional coverage to ensure a sustainable, long-term impact on stray animal welfare and public health.



# Project Setup Guide

## Setting Up a Virtual Environment

A virtual environment helps isolate dependencies for this project, ensuring compatibility and avoiding conflicts with system-wide packages.

### Steps to Create a Virtual Environment

1. **Ensure Python is Installed**  
   Check if Python is installed by running:
   ```sh
   python --version
   ```
   or
   ```sh
   python3 --version
   ```

2. **Create a Virtual Environment**  
   Run the following command in the project directory:
   ```sh
   python -m venv venv
   ```
   or (if using Python 3)
   ```sh
   python3 -m venv venv
   ```

3. **Activate the Virtual Environment**  
   - **Windows (cmd/PowerShell):**
     ```sh
     venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```sh
     source venv/bin/activate
     ```

## Installing Dependencies

Once the virtual environment is activated, install dependencies using the `requirements.txt` file.

```sh
pip install -r requirements.txt
```

## Deactivating the Virtual Environment

To exit the virtual environment, run:
```sh
deactivate
```

## Additional Notes
- If `pip` is not installed or outdated, upgrade it using:
  ```sh
  python -m pip install --upgrade pip
  ```
- If there are multiple `requirements` files, install all by running:
  ```sh
  pip install -r requirements/dev.txt -r requirements/prod.txt
  ```

Now you're all set to run the project within a properly isolated environment!

