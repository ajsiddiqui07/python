#include <iostream>
#include <fstream>
#include <string>

using namespace std;

void logStudyHours()
{
    string day;
    float hours;

    cout << "Enter Day: ";
    cin >> day;

    cout << "Enter Study Hours: ";
    cin >> hours;

    ofstream file("study_data.txt", ios::app);

    file << day << " " << hours << endl;

    file.close();

    cout << "Study hours logged successfully!\n\n";
}

void weeklyReport()
{
    ifstream file("study_data.txt");

    if (!file)
    {
        cout << "No study data found!\n\n";
        return;
    }

    string day;
    float hours;
    float total = 0;
    int count = 0;

    cout << "\n----- Weekly Study Report -----\n";

    while (file >> day >> hours)
    {
        cout << day << " : " << hours << " hours" << endl;

        total += hours;
        count++;
    }

    cout << "--------------------------------\n";
    cout << "Total Study Hours : " << total << endl;

    if (count > 0)
    {
        cout << "Average Study Hours : " << total / count << endl;
    }

    cout << endl;

    file.close();
}

int main()
{
    int choice;

    while (true)
    {
        cout << "===== Student Productivity Tracker =====\n";
        cout << "1. Log Daily Study Hours\n";
        cout << "2. Generate Weekly Report\n";
        cout << "3. Exit\n";

        cout << "Enter Your Choice: ";
        cin >> choice;

        switch (choice)
        {
            case 1:
                logStudyHours();
                break;

            case 2:
                weeklyReport();
                break;

            case 3:
                cout << "Exiting Program...\n";
                return 0;

            default:
                cout << "Invalid Choice!\n\n";
        }
    }

    return 0;
}
