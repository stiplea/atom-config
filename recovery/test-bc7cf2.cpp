#include <fstream>
#include <iostream>

using namespace std;

ifstream f("test.in");
ofstream g("test.out");

int main() {
  int a, b, c;
  cin >> a >> b;
  cout << a + b << '\n';

  return 0;
}
