import java.util.*;

public class Limitless {
    private static Scanner scanner = new Scanner(System.in);
    private static Map<String, User> database = new HashMap<>();
    private static String currentUser = null;

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n--- LIMITLESS // SECURE ACCESS TERMINAL ---");
            System.out.println("1. INITIALIZE (Login)");
            System.out.println("2. NEW PROFILE CONFIGURATION (Register)");
            System.out.println("3. TERMINATE SESSION (Exit)");
            System.out.print("> ");
            
            String choice = scanner.nextLine();

            switch (choice) {
                case "1": login(); break;
                case "2": register(); break;
                case "3": System.exit(0);
                default: System.out.println("INVALID PROTOCOL.");
            }
        }
    }

    private static void register() {
        System.out.println("\n[NEW PROFILE CONFIGURATION]");
        System.out.print("FULL NAME: ");
        String name = scanner.nextLine();
        System.out.print("PASSWORD: ");
        String pass = scanner.nextLine();
        System.out.print("PRIMARY OBJECTIVE: ");
        String goal = scanner.nextLine();
        System.out.print("CURRENT GRADE: ");
        String grade = scanner.nextLine();

        User newUser = new User(pass, goal, grade);
        
        System.out.println("\n--- THREAT CONTAINMENT ---");
        String[] apps = {"Instagram", "YouTube", "Facebook"};
        for (String app : apps) {
            System.out.print("RESTRICT " + app + "? (y/n): ");
            if (scanner.nextLine().equalsIgnoreCase("y")) {
                System.out.print("  ALLOW HOURS: ");
                int allow = Integer.parseInt(scanner.nextLine());
                newUser.addRule(app, allow);
            }
        }

        database.put(name, newUser);
        System.out.println("\nCALIBRATION COMPLETE.");
    }

    private static void login() {
        System.out.print("\nIDENTITY: ");
        String name = scanner.nextLine();
        System.out.print("ACCESS CODE: ");
        String pass = scanner.nextLine();

        User user = database.get(name);
        if (user != null && user.getPassword().equals(pass)) {
            showDashboard(name, user);
        } else {
            System.out.println("AUTHENTICATION FAILED.");
        }
    }

    private static void showDashboard(String name, User user) {
        System.out.println("\n========================================");
        System.out.println("OPERATOR: " + name.toUpperCase());
        System.out.println("SYSTEM STATUS: ONLINE");
        System.out.println("OBJECTIVE: " + user.getGoal());
        System.out.println("RATING: " + user.getGrade());
        System.out.println("----------------------------------------");
        System.out.println("ACTIVE PROTOCOLS:");
        user.printRules();
        System.out.println("========================================");
        System.out.println("Press Enter to Logout...");
        scanner.nextLine();
    }
}

class User {
    private String password, goal, grade;
    private Map<String, Integer> rules = new HashMap<>();

    public User(String password, String goal, String grade) {
        this.password = password;
        this.goal = goal;
        this.grade = grade;
    }

    public void addRule(String app, int hours) { rules.put(app, hours); }
    public String getPassword() { return password; }
    public String getGoal() { return goal; }
    public String getGrade() { return grade; }
    
    public void printRules() {
        if (rules.isEmpty()) System.out.println("  NO RESTRICTIONS APPLIED.");
        for (var entry : rules.entrySet()) {
            System.out.println("  - " + entry.getKey().toUpperCase() + ": LOCKED (Allow: " + entry.getValue() + "H)");
        }
    }
}