#include <fstream>
#include <iostream>
#include <vector>

using namespace std;

ifstream f("in.in");
ofstream g("in.out");

int main() {
  int a, b;
  f >> a >> b;
  g << a * b << '\n';
  cout << "HELLO" << '\n';
  //vector<int> v(10, 1);
  //for (auto x : v) {
  //  cout << x * 10 << '\n';
  //}

  return 0;
}
