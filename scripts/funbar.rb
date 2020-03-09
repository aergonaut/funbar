require "json"

output =
  {
    hostname: `hostname -s`.strip,
    time: Time.now.strftime("%a %-d %b %H:%M")
  }

puts JSON.dump(output)
